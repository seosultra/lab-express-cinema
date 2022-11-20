const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  director: String,
  starts: [String],
  image: String,
  description: { type: String },
  showtimes: [String],
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
