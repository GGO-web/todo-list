import React, { useState } from 'react';
import {
	Button,
	Col,
	Form,
	FormGroup,
	Input,
	InputGroup,
	InputGroupText,
} from 'reactstrap';

import { v4 as uuidv4 } from 'uuid';

import './CreateTodo.css';

import FilterTodo from './components/FilterTodo/FilterTodo';

const CreateTodo = ({ filteredTodos, setFilteredTodos, todos, setTodos }) => {
	const [todoInputValue, setTodoInputValue] = useState('');

	const inputHandler = (e) => {
		setTodoInputValue(e.target.value);
	};

	const formHandler = (e) => {
		e.preventDefault();

		if (todoInputValue.length >= 2) {
			setTodos([
				...todos,
				{ value: todoInputValue, completed: false, id: uuidv4() },
			]);

			// clear input field
			setTodoInputValue('');
		}
	};

	return (
		<Form className='col-md-12 m-auto mb-5' onSubmit={formHandler}>
			<FormGroup className='row gx-3 text-center justify-content-center'>
				<Col md='6'>
					<InputGroup>
						<InputGroupText color='danger' htmlFor='todo-input'>
							Enter a todo task
						</InputGroupText>
						<Input
							id='todo-input'
							name='todo'
							onChange={inputHandler}
							value={todoInputValue}
							placeholder='some aim...'
						></Input>
						<Button className='button-style' color='info'>
							<i
								className='fa-solid fa-plus'
								style={{ fontSize: '20px', color: '#fff' }}
							></i>
						</Button>
					</InputGroup>
				</Col>
				<Col md='2'>
					<FilterTodo
						{...{ filteredTodos, setFilteredTodos, todos, setTodos }}
					></FilterTodo>
				</Col>
			</FormGroup>
		</Form>
	);
};

export default CreateTodo;
