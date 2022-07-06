import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// !! GET TODOS
export const fetchTodos = createAsyncThunk(
  "todos/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4000/todos");
      return await res.json();
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// !! DELETE TODO
export const removeTodo = createAsyncThunk(
  "todos/remove",
  async (id, thunkAPI) => {
    try {
      await fetch(`http://localhost:4000/todos/${id}`, {
        method: "DELETE",
      });
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// !! PATCH TODO
export const editTodo = createAsyncThunk(
  "todos/edit",
  async (item, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:4000/todos/${item._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ favorite: !item.favorite }),
      });
      return res.json();
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// !! ADD NEW TODO
export const addNewTodo = createAsyncThunk(
  "todos/add",
  async (text, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ todo: text, favorite: false }),
      });
      const data = await res.json();
      return thunkAPI.fulfillWithValue(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder // !! GET TODOS
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.error = action.payload.message;
        state.loading = false;
      }) // !! DELETE TODO
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((item) => {
          return item._id !== action.payload;
        });
        state.loading = false;
      })
      // .addCase(removeTodo.pending, (state) => {
      //   state.loading = true;
      // })
      .addCase(removeTodo.rejected, (state, action) => {
        state.error = action.payload.message;
        state.loading = false;
      }) // !! PATCH TODO
      .addCase(editTodo.fulfilled, (state, action) => {
        state.todos = state.todos.map((item) => {
          if (item._id === action.payload._id) {
            return action.payload;
          }
          return item;
        });
        state.loading = false;
      })
      // .addCase(editTodo.pending, (state) => {
      //   state.loading = true;
      // })
      .addCase(editTodo.rejected, (state, action) => {
        state.error = action.payload.message;
        state.loading = false;
      }) // !! ADD NEW TODO
      .addCase(addNewTodo.fulfilled, (state, action) => {
        state.todos.unshift(action.payload);
        state.loading = false;
      })
      // .addCase(addNewTodo.pending, (state) => {
      //   state.loading = true;
      // })
      .addCase(addNewTodo.rejected, (state, action) => {
        state.error = action.payload.message;
        state.loading = false;
      });
  },
});

export default todosSlice.reducer;
