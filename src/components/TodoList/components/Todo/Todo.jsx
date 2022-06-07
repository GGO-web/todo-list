import React, { useState } from 'react';
import { Input, InputGroup, Button } from 'reactstrap';

import './Todo.css';

const Todo = ({ todos, setTodos, todo }) => {
	const [todoItem, setTodoItem] = useState(todo);

	const todoItemHandler = (e) => {
		setTodoItem({ ...todoItem, value: e.target.value });
	};

	const todoItemValidate = () => {
		if (todoItem.value === '') {
			setTodoItem({ ...todoItem, value: todo.value });
		} else {
			setTodos(
				todos.map((item) => {
					return item.id === todo.id
						? { ...item, value: todoItem.value }
						: item;
				})
			);

			todo.value = todoItem.value;
		}
	};

	const markTodoCompleted = () => {
		setTodos(
			todos.map((todo) => {
				if (todo.id === todoItem.id) {
					return { ...todo, completed: !todo.completed };
				}

				return todo;
			})
		);
	};

	const removeTodoItem = () => {
		setTodos(
			todos.filter((todo) => {
				return todo.id !== todoItem.id;
			})
		);
	};

	return (
		<InputGroup className='mb-3'>
			<Input
				value={todoItem.value}
				onChange={todoItemHandler}
				onBlur={todoItemValidate}
				className={todo.completed ? 'completed' : ''}
			/>
			<Button onClick={markTodoCompleted} color='primary'>
				&#10003; Complete
			</Button>
			<Button color='danger' onClick={removeTodoItem}>
				&#128465; Remove
			</Button>
		</InputGroup>
	);
};

export default Todo;
