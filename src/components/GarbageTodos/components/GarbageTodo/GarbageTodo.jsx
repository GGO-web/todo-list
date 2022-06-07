import React, { useState } from 'react';
import { Input, InputGroup, Button } from 'reactstrap';

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

	const removegarbageTodoItem = () => {
		setTodos([...todos, garbageTodoItem]);

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
			<Button onClick={markTodoCompleted} color='primary'>
				&#10003; Complete
			</Button>
			<Button color='danger' onClick={removegarbageTodoItem}>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='16'
					height='16'
					viewBox='0 0 448 512'
					style={{
						display: 'inline-block',
						verticalAlign: 'middle',
						marginRight: '5px',
						marginBottom: '3px',
					}}
				>
					<path
						d='M284.2 0C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2zM31.1 128H416L394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128zM207 199L127 279C117.7 288.4 117.7 303.6 127 312.1C136.4 322.3 151.6 322.3 160.1 312.1L199.1 273.9V408C199.1 421.3 210.7 432 223.1 432C237.3 432 248 421.3 248 408V273.9L287 312.1C296.4 322.3 311.6 322.3 320.1 312.1C330.3 303.6 330.3 288.4 320.1 279L240.1 199C236.5 194.5 230.4 191.1 223.1 191.1C217.6 191.1 211.5 194.5 207 199V199z'
						fill='#fff'
					/>
				</svg>
				Restore
			</Button>
		</InputGroup>
	);
};

export default GarbageTodo;