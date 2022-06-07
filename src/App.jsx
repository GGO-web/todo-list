import React, { useEffect, useState } from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { TODO_ITEMS } from './constants';

import Header from './components/Header/Header';
import CreateTodo from './components/CreateTodo/CreateTodo';
import TodoList from './components/TodoList/TodoList';

/**
 * TODO:
 * - Add filter for completed, uncompleted, all todos
 * - Add trash list for removed todos
 */

function App() {
	const [todos, setTodos] = useState([]);
	const [filteredTodos, setFilteredTodos] = useState([]);

	const saveTodosToLocalStorage = () => {
		if (todos.length) localStorage.setItem(TODO_ITEMS, JSON.stringify(todos));
	};

	const getTodosFromLocalStorage = () => {
		const savedTodos = localStorage.getItem(TODO_ITEMS);

		if (savedTodos) {
			setTodos(JSON.parse(savedTodos));
		}
	};

	useEffect(() => {
		getTodosFromLocalStorage();
	}, []);

	useEffect(() => {
		saveTodosToLocalStorage();
	}, [todos]);

	return (
		<div className='container'>
			<Header></Header>
			<CreateTodo
				{...{ filteredTodos, setFilteredTodos, todos, setTodos }}
			></CreateTodo>
			<TodoList {...{ filteredTodos, todos, setTodos }}></TodoList>
		</div>
	);
}

export default App;
