import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTodos,
  removeTodo,
  editTodo,
} from "../../features/todos/todosSlice.js";
import styled from "./todo.module.css";

const Todo = () => {
  const todos = useSelector((state) => state.todos);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleRemoveTodo = (_id) => {
    dispatch(removeTodo(_id));
  };
  const handleChecked = (item) => {
    dispatch(editTodo(item));
  };

  if (loading) {
    return (
      <div className={styled.loaderPosition}>
        <div className={styled.loader}></div>
      </div>
    );
  }
  if (error || todos.length === 0) {
    return (
      <div className={styled.error}>
        <img
          src="https://i.pinimg.com/originals/ef/8b/bd/ef8bbd4554dedcc2fd1fd15ab0ebd7a1.gif"
          alt="animation"
        />
      </div>
    );
  }

  return (
    <React.Fragment>
      {todos.map((item, _id) => {
        return (
          <ul key={_id}>
            <li className={item.favorite ? styled.active : null}>
              <div className={styled.wrapperCheckBox}>
                <label className={styled.container}>
                  <input
                    checked={item.favorite}
                    type="checkbox"
                    onChange={() => handleChecked(item)}
                  />
                  <div className={styled.checkmark}></div>
                </label>
              </div>

              <div className={styled.wrapperInfoTodo}>
                <div
                  className={
                    item.favorite ? styled.activeText : styled.wrapperText
                  }
                >
                  {item.todo}
                </div>
              </div>

              <div className={styled.wrapperDeleteBtn}>
                <button onClick={() => handleRemoveTodo(item._id)}>×</button>
              </div>
            </li>
          </ul>
        );
      })}
    </React.Fragment>
  );
};

export default Todo;
