const mongoose = require("mongoose");
const todosSchema = mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },

  favorite: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Todo = mongoose.model("Todo", todosSchema);
module.exports = Todo;
