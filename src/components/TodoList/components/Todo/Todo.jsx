import React, { useState } from 'react';
import { Input, InputGroup, Button } from 'reactstrap';

import './Todo.css';

const Todo = ({ todos, setTodos, todo }) => {
	const [todoItemValue, setTodoItemValue] = useState(todo);

	const todoItemHandler = (e) => {
		setTodoItemValue({ ...todoItemValue, value: e.target.value });
	};

	const todoItemValidate = () => {
		if (todoItemValue === '') {
			setTodoItemValue({ ...todoItemValue, value: todo.value });
		} else todo.value = todoItemValue.value;
	};

	const markTodoCompleted = () => {
		setTodos(
			todos.map((todo) => {
				if (todo.id === todoItemValue.id) {
					console.log(todo);
					return { ...todo, completed: !todo.completed };
				}

				return todo;
			})
		);
	};

	const removeTodoItem = () => {
		setTodos(
			todos.filter((todo) => {
				return todo.id !== todoItemValue.id;
			})
		);
	};

	return (
		<InputGroup className='mb-3'>
			<Input
				value={todoItemValue.value}
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
