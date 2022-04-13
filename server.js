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
    // apiKey: "MAP_API_KEY",
    apiKey: "AIzaSyCplpc0oQkWZMiH7Qhu9RruadMb6PikeuU",
  };

  // map = new google.maps.Map(document.getElementById("map1"), { ...});
  // map = new google.maps.Map(document.getElementById("map2"), {...});
  // map = new google.maps.Map(document.getElementById("map3"), {...});
  // map = new google.maps.Map(document.getElementById("map4"), {...});

  // const loader = new Loader(apiOptions);
  // console.log("YOUR LOADER IS NOT DEFINED");

  // loader.load().then(() => {
  //   console.log("Maps JS API loaded");
  //   const map = displayMap();
  //   const markers = addMarkers(map);
  //   clusterMarkers(map, markers);
  //   addPanToMarker(map, markers);
  // });

  function displayMap1() {
    const mapOptions = {
      // The map, centered at Banner Farm Mitigation Site
      center: { lat: 35.350886, lng: -82.556899 },
      zoom: 15,
      mapId: "map1",
      mapTypeId: "terrain",
    };
    const mapDiv = document.getElementById("map");
    return new google.maps.Map(mapDiv, mapOptions);
  }

  function displayMap2() {
    const mapOptions = {
      // The map, centered at East Buffalo Mitigation Site
      center: { lat: 35.3662, lng: -83.8026 },
      zoom: 15,
      mapId: "map2",
      mapTypeId: "terrain",
    };
    const mapDiv = document.getElementById("map");
    return new google.maps.Map(mapDiv, mapOptions);
  }

  function displayMap3() {
    const mapOptions = {
      // The map, centered at Oak Hill Dairy Mitigation Site
      center: { lat: 35.40367, lng: -81.35136 },
      zoom: 15,
      mapId: "map3",
      mapTypeId: "terrain",
    };
    const mapDiv = document.getElementById("map");
    return new google.maps.Map(mapDiv, mapOptions);
  }

  function displayMap4() {
    const mapOptions = {
      // The map, centered at Double H Mitigation Site
      center: { lat: 36.529847, lng: -80.987143 },
      zoom: 15,
      mapId: "map4",
      mapTypeId: "terrain",
    };
    const mapDiv = document.getElementById("map");
    return new google.maps.Map(mapDiv, mapOptions);
  }
  // function addMarkers(map) {
  //   const locations = {
  //     moogMusic: { lat: 35.60119, lng: -82.555381 },
  //     cumberlandFalls: { lat: 35.604992, lng: -82.564352 },
  //     pinballMuseum: { lat: 35.596385, lng: -82.556802 },
  //     mccormickField: { lat: 35.587536, lng: -82.549452 },
  //     greyEagle: { lat: 35.587072, lng: -82.564484 },
  //   };
  //   const markers = [];
  //   for (const location in locations) {
  //     const markerOptions = {
  //       map: map,
  //       position: locations[location],
  //       icon: "./img/custom_pin.png",
  //     };
  //     const marker = new google.maps.Marker(markerOptions);
  //     markers.push(marker);
  //   }
  //   return markers;
  // }

  // function clusterMarkers(map, markers) {
  //   const clustererOptions = { imagePath: "./img/m" };
  //   const markerCluster = new MarkerClusterer(map, markers, clustererOptions);
  // }

  // function addPanToMarker(map, markers) {
  //   let circle;
  //   markers.map((marker) => {
  //     marker.addListener("click", (event) => {
  //       const location = { lat: event.latLng.lat(), lng: event.latLng.lng() };
  //       map.panTo(location);
  //       if (circle) {
  //         circle.setMap(null);
  //       }
  //       circle = drawCircle(map, location);
  //     });
  //   });
  // }

  // function drawCircle(map, location) {
  //   const circleOptions = {
  //     strokeColor: "#FF0000",
  //     strokeOpacity: 0.8,
  //     strokeWeight: 1,
  //     map: map,
  //     center: location,
  //     radius: 800,
  //   };
  //   const circle = new google.maps.Circle(circleOptions);
  //   return circle;
  // }

  // Map crap end

  app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`);
  });
});

module.exports = app;
