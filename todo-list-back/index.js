const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://into:code@cluster0.rlz7r.mongodb.net/TodoList?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Соединение прошло успешно"))
  .catch(() => console.log("Ошибка при соединении с MongoDB"));

app.use(require("./routes/todos.route"));

app.listen(port, () => console.log("server started"));
