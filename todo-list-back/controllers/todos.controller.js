const Todo = require("../models/Todo.model");

module.exports.todosController = {
  // ДОБАВЛЕНИЕ ДЕЛА
  addTodo: async (req, res) => {
    try {
      const todo = await Todo.create({
        todo: req.body.todo,
      });
      return res.json(todo);
    } catch (err) {
      res.json(err);
    }
  },
  //УДАЛЕНИЕ ДЕЛА
  deleteTodoById: async (req, res) => {
    try {
      await Todo.findByIdAndRemove(req.params.id);
      res.json("Дело удалено");
    } catch (err) {
      res.json(err);
    }
  },

  // ИЗМЕНЕНИЕ ДЕЛА
  editTodoById: async (req, res) => {
    try {
      const todo = await Todo.findByIdAndUpdate(
        req.params.id,
        {
          favorite: req.body.favorite,
        },

        { new: true }
      );
      res.json(todo);
    } catch (err) {
      res.json(err);
    }
  },

  //ВЫВОД ВСЕХ ДЕЛО
  getTodos: async (req, res) => {
    try {
      const todo = await Todo.find();
      res.json(todo);
    } catch (err) {
      res.json(err);
    }
  },
};
