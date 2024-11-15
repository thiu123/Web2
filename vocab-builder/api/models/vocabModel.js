const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VocabSchema = new Schema(
  {
    english: {
      type: String,
      required: [true, "English word cannot be blank"],
    },
    german: {
      type: String,
      required: [true, "German word cannot be blank"],
    },
    vietnamese: {
      type: String,
      required: [true, "Vietnamese word cannot be blank"],
    },
  },
  { collection: "vocab" }
);

module.exports = mongoose.model("Vocab", VocabSchema);
