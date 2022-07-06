import React, { useState } from "react";
import Todo from "../Todo/Todo";
import Header from "../Header/Header";
import { addNewTodo } from "../../features/todos/todosSlice";
import { useDispatch } from "react-redux";
import styled from "./todos.module.css";

const Todos = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  //   !! ADD NEW
  // проверка с помощью трим на пустоту и пробелы в инпуте
  const addTodo = () => {
    if (text.trim().length) {
      dispatch(addNewTodo(text));
    }
    setText("");
  };

  // добавление через ENTER
  const handleAddEnter = (e) => {
    const code = e.keyCode || e.which;
    if (code === 13) {
      addTodo();
    }
  };

  return (
    <div className={styled.wrapperTodos}>
      <Header />
      <div className={styled.wrapperInputAndBtnPosition}>
        <input
          type="text"
          placeholder="Youre new todo..."
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => handleAddEnter(e)}
          value={text}
          required
        />
        <button onClick={addTodo}>ADD</button>
      </div>
      <Todo />
    </div>
  );
};

export default React.memo(Todos);
