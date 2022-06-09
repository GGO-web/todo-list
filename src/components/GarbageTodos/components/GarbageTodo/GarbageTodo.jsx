import React, { useState } from 'react';
import { Input, InputGroup, Button } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheck, faUndo } from '@fortawesome/fontawesome-free-solid';

const GarbageTodo = ({
	todos,
	setTodos,
	todo,
	garbageTodos,
	setGarbageTodos,
}) => {
	const [garbageTodoItem, setGarbageTodoItem] = useState(todo);

	const garbageTodoItemHandler = (e) => {
		setGarbageTodoItem({ ...garbageTodoItem, value: e.target.value });
	};

	const garbageTodoItemValidate = () => {
		if (garbageTodoItem.value === '') {
			setGarbageTodoItem({ ...garbageTodoItem, value: todo.value });
		} else {
			setGarbageTodos(
				garbageTodos.map((item) => {
					return item.id === todo.id
						? { ...item, value: garbageTodoItem.value }
						: item;
				})
			);

			todo.value = garbageTodoItem.value;
		}
	};

	const markTodoCompleted = () => {
		setGarbageTodos(
			garbageTodos.map((todo) => {
				if (todo.id === garbageTodoItem.id) {
					return { ...todo, completed: !todo.completed };
				}

				return todo;
			})
		);
	};

	const restoreGarbageTodoItem = () => {
		setTodos([...todos, garbageTodoItem]);

		setGarbageTodos(
			garbageTodos.filter((todo) => {
				return todo.id !== garbageTodoItem.id;
			})
		);
	};

	const removeGarbageTodoItem = () => {
		setGarbageTodos(
			garbageTodos.filter((todo) => {
				return todo.id !== garbageTodoItem.id;
			})
		);
	};

	return (
		<InputGroup className='mb-3'>
			<Input
				value={garbageTodoItem.value}
				onChange={garbageTodoItemHandler}
				onBlur={garbageTodoItemValidate}
				className={todo.completed ? 'completed' : ''}
			/>
			<Button
				data-testid='garbage-mark-button'
				onClick={markTodoCompleted}
				color='primary'
			>
				<FontAwesomeIcon icon={faCheck} style={{ marginRight: '5px' }} />
				Complete
			</Button>
			<Button
				data-testid='garbage-restore-button'
				color='light'
				onClick={restoreGarbageTodoItem}
			>
				<FontAwesomeIcon icon={faUndo} style={{ marginRight: '5px' }} />
				Restore
			</Button>
			<Button color='danger' onClick={removeGarbageTodoItem}>
				<FontAwesomeIcon icon={faTrash} style={{ marginRight: '5px' }} />
				Remove
			</Button>
		</InputGroup>
	);
};

export default GarbageTodo;
