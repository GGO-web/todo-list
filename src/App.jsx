import React, { useEffect, useState } from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { GARBAGE_ITEMS, TODO_ITEMS } from './constants';

import Header from './components/Header/Header';
import CreateTodo from './components/CreateTodo/CreateTodo';
import TodoList from './components/TodoList/TodoList';
import GarbageTodos from './components/GarbageTodos/GarbageTodos';

/**
 * TODO:
 * - Write unit test for individual components
 */

function App() {
	const [todos, setTodos] = useState([]);
	const [filteredTodos, setFilteredTodos] = useState([]);
	const [garbageTodos, setGarbageTodos] = useState([]);

	const saveTodosToLocalStorage = () => {
		const getRecord = (storageRecord, storageFieldName, items) => {
			if (items.length === 0 && storageRecord) {
				localStorage.setItem(storageFieldName, []);
			} else if (items.length) {
				localStorage.setItem(storageFieldName, JSON.stringify(items));
			}
		};

		const savedTodos = localStorage.getItem(TODO_ITEMS);
		const savedGarbage = localStorage.getItem(GARBAGE_ITEMS);

		getRecord(savedTodos, TODO_ITEMS, todos);
		getRecord(savedGarbage, GARBAGE_ITEMS, garbageTodos);
	};

	const getTodosFromLocalStorage = () => {
		const saveRecord = (storageRecord, setterTodos) => {
			if (storageRecord) {
				setterTodos(JSON.parse(storageRecord));
			}
		};

		const savedTodos = localStorage.getItem(TODO_ITEMS);
		const savedGarbage = localStorage.getItem(GARBAGE_ITEMS);

		saveRecord(savedTodos, setTodos);
		saveRecord(savedGarbage, setGarbageTodos);
	};

	useEffect(() => {
		getTodosFromLocalStorage();
	}, []);

	useEffect(() => {
		saveTodosToLocalStorage();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [todos, garbageTodos]);

	return (
		<div className='container'>
			<Header></Header>
			<CreateTodo
				{...{ filteredTodos, setFilteredTodos, todos, setTodos }}
			></CreateTodo>
			<TodoList
				{...{
					filteredTodos,
					todos,
					setTodos,
					garbageTodos,
					setGarbageTodos,
				}}
			></TodoList>
			<GarbageTodos
				{...{ todos, setTodos, garbageTodos, setGarbageTodos }}
			></GarbageTodos>
		</div>
	);
}

export default App;
