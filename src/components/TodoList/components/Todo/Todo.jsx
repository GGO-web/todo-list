import React, { useState } from 'react';
import { Input, InputGroup, Button } from 'reactstrap';

import './Todo.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash } from '@fortawesome/fontawesome-free-solid';

const Todo = ({ todos, setTodos, todo, garbageTodos, setGarbageTodos }) => {
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
		setGarbageTodos([...garbageTodos, todoItem]);

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
				<FontAwesomeIcon icon={faCheck} style={{ marginRight: '5px' }} />
				Complete
			</Button>
			<Button color='danger' onClick={removeTodoItem}>
				<FontAwesomeIcon icon={faTrash} style={{ marginRight: '5px' }} />
				Remove
			</Button>
		</InputGroup>
	);
};

export default Todo;
