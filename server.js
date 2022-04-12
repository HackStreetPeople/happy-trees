require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const passport = require("passport");
const moment = require("moment");
const helmet = require("helmet");
const PORT = process.env.PORT || 3333;
const app = express();
const db = require("./models");

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

if (app.get("env") !== "test") {
  app.use(morgan("dev")); // Hook up the HTTP logger
}

app.use(express.static("public"));

require("./config/passport")(db, app, passport); // pass passport for configuration

// Define our routes
app.use("/api", require("./routes/apiRoutes")(passport, db));
app.use(require("./routes/htmlRoutes")(db));

// Secure express app
app.use(
  helmet.hsts({
    maxAge: moment.duration(1, "years").asMilliseconds(),
  })
);

// catch 404 and forward to error handler
if (app.get("env") !== "development") {
  app.use((req, res, next) => {
    const err = new Error("Not Found: " + req.url);
    err.status = 404;
    next(err);
  });
}

const syncOptions = {
  force: process.env.FORCE_SYNC === "true",
};

if (app.get("env") === "test") {
  syncOptions.force = true;
}

db.sequelize.sync(syncOptions).then(() => {
  if (app.get("env") !== "test" && syncOptions.force) {
    require("./db/seed")(db);
  }

  // Map crap start
  const apiOptions = {
    apiKey: "MAP_API_KEY",
    // apiKey: "AIzaSyCplpc0oQkWZMiH7Qhu9RruadMb6PikeuU",
  };

  const loader = new Loader(apiOptions);

  loader.load().then(() => {
    console.log("Maps JS API loaded");
    const map = displayMap();
    const markers = addMarkers(map);
    clusterMarkers(map, markers);
    addPanToMarker(map, markers);
  });

  function displayMap() {
    const mapOptions = {
      // The map, centered at The Double Crown Bar
      center: { lat: 35.57804, lng: -82.57887 },
      zoom: 10,
      center: doubleCrown,
      // center: { lat: -33.860664, lng: 151.208138 },
      // zoom: 14,
      // mapId: "YOUR_MAP_ID",
    };
    const mapDiv = document.getElementById("map");
    return new google.maps.Map(mapDiv, mapOptions);
  }

  function addMarkers(map) {
    const locations = {
      moogMusic: { lat: 35.60119, lng: -82.555381 },
      cumberlandFalls: { lat: 35.604992, lng: -82.564352 },
      pinballMuseum: { lat: 35.596385, lng: -82.556802 },
      mccormickField: { lat: 35.587536, lng: -82.549452 },
      greyEagle: { lat: 35.587072, lng: -82.564484 },
    };
    const markers = [];
    for (const location in locations) {
      const markerOptions = {
        map: map,
        position: locations[location],
        icon: "./img/custom_pin.png",
      };
      const marker = new google.maps.Marker(markerOptions);
      markers.push(marker);
    }
    return markers;
  }

  function clusterMarkers(map, markers) {
    const clustererOptions = { imagePath: "./img/m" };
    const markerCluster = new MarkerClusterer(map, markers, clustererOptions);
  }

  function addPanToMarker(map, markers) {
    let circle;
    markers.map((marker) => {
      marker.addListener("click", (event) => {
        const location = { lat: event.latLng.lat(), lng: event.latLng.lng() };
        map.panTo(location);
        if (circle) {
          circle.setMap(null);
        }
        circle = drawCircle(map, location);
      });
    });
  }

  function drawCircle(map, location) {
    const circleOptions = {
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 1,
      map: map,
      center: location,
      radius: 800,
    };
    const circle = new google.maps.Circle(circleOptions);
    return circle;
  }

  // Map crap end

  app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`);
  });
});

module.exports = app;
