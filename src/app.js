const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// define paths for express config
const publicDirectoryPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// set up handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", publicDirectoryPath);
hbs.registerPartials(partialsPath);
// set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "weather",
    name: "mahmoud khalid",
  });
});
app.get("/index", (req, res) => {
  res.render("index", {
    title: "weather",
    name: "mahmoud khalid",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "mahmoud khalid",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "this is some helpful text",
    title: "Help",
    name: "mahmoud khalid",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "No address , You must enter an address",
    });
  }
  // console.log(req.query.address);
  geocode(req.query.address, (error, { latitude, longitude, label } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastData,
        label,
        address: req.query.address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "mahmoud khalid",
    errorMessage: "Help document not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "mahmoud khalid",
    errorMessage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("server is up on port 300");
});
