const mongoose = require("mongoose");

const todomodel = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },

    description: {
      type: String,
      require: true,
    },

    author: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const model = mongoose.model("todos", todomodel);

module.exports = model;
