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

  // Map stuff starts here

  // function initMap() {
  //   let lenoir = { lat: 35.9140196, lng: -81.5389849 };
  //   let map = new google.maps.Map(document.getElementById("map"), {
  //     zoom: 6,
  //     center: lenoir,
  //   });

  //   // ARRAY of multiple markers
  //   let markers = [
  //     {
  //       coords: { lat: 36.529847, lng: -80.987143 },
  //       content: "<h3>Double H Mitigation Site</h3>",
  //     },

  //     {
  //       coords: { lat: 35.350886, lng: -82.556899 },
  //       content: "<h3>Banner Farm Road Mitigation Site</h3>",
  //     },

  //     {
  //       coords: { lat: 35.40367, lng: -81.35136 },
  //       content: "<h3>Oak Hill Dairy Mitigation Site</h3>",
  //     },

  //     {
  //       coords: { lat: 35.3662, lng: -83.8026 },
  //       content: "<h3>East Buffalo Creek Mitigation Site</h3>",
  //     },
  //   ];

  //   // Loop through markers
  //   for (let i = 0; i < markers.length; i++) {
  //     // Add the marker w/ this
  //     addMarker(markers[i]);
  //   }

  //   function addMarker(props) {
  //     let marker = new google.maps.Marker({
  //       position: props.coords,
  //       map: map,
  //     });

  //     // Check the content
  //     if (props.content) {
  //       let infoWindow = new google.maps.InfoWindow({
  //         content: props.content,
  //       });

  //       marker.addListener("click", function () {
  //         infoWindow.open(map, marker);
  //       });
  //     }
  //   }
  // }

  // Map crap end

  app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`);
  });
});

module.exports = app;
