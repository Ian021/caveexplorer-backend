const mongoose = require("mongoose");

const rankingSchema = new mongoose.Schema({
  list: Array,
  players: Array
});

module.exports = mongoose.model("Ranking", rankingSchema);
