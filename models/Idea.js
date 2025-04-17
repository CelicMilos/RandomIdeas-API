const mongoose = require("mongoose");

const IdeaSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "Please add a text to field"],
  },
  tag: {
    type: String,
  },
  username: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Idea", IdeaSchema); //('ime modela',ideaSchema)
