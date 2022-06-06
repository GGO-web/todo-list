import React, { useState } from "react";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./components/Header/Header";
import CreateTodo from "./components/CreateTodo/CreateTodo";
import TodoList from "./components/TodoList/TodoList";

/**
 * TODO:
 * - Add todoList to LocalStorage
 * - Add husky precommit hook
 * - Add trash list for removed todos
 */

function App() {
   const [todos, setTodos] = useState([]);

   return (
      <div className="container">
         <Header></Header>
         <CreateTodo {...{ todos, setTodos }}></CreateTodo>
         <TodoList {...{ todos, setTodos }}></TodoList>
      </div>
   );
}

export default App;
