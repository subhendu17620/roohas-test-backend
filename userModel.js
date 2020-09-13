const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    roll: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);
