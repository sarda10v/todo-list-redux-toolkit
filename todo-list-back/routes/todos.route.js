const { Router } = require("express");
const { todosController } = require("../controllers/todos.controller");

const router = Router();
// CRUD
router.post("/todos", todosController.addTodo); // добавить дело
router.delete("/todos/:id", todosController.deleteTodoById); // удалить дело
router.patch("/todos/:id", todosController.editTodoById); // изменить дело
router.get("/todos", todosController.getTodos); // показать все дела

module.exports = router;
