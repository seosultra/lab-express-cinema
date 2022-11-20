const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const { restart } = require("nodemon");
const path = require("path");

const Movie = require("./models/movie");

const app = express();

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

///// route handelers /////////
// 1- route handler to home
app.get("/", (req, res, next) => {
  res.render("home");
});

// 2nd route handler - movies list

app.get("/movies", (req, res, next) => {
  Movie.find()
    .then((movies) => {
      console.log(movies);
      res.render("movies", { movies: movies });
    })
    .catch((error) => {
      next(error);
    });
});
app.get("/movie/:id", (req, res, next) => {
  const { id } = req.params;
  Movie.findById(id)
    .then((movie) => {
      res.render("movie", { movie: movie });
    })
    .catch((error) => {
      next(error);
    });
});

/// Catch all error handlers
app.use((error, req, res, next) => {
  console.log(error);
  res.render("error");
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT);
  })
  .catch((error) => {
    console.log("There was an error connecting to the database");
    console.log(error);
  });
