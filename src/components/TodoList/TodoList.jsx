import React, { useState } from 'react';
import Todo from './components/Todo/Todo';

import { v4 as uuidv4 } from 'uuid';

const TodoList = ({
	filteredTodos,
	todos,
	setTodos,
	garbageTodos,
	setGarbageTodos,
}) => {
	const [currentTodo, setCurrentTodo] = useState(null);

	const dragStartHandler = (e, todo) => {
		setCurrentTodo({ ...todo });
	};

	const dragLeaveHandler = (e) => {
		const input = e.target.querySelector('.form-control');
		if (input) input.style.background = 'white';

		return e;
	};

	const dragEndHandler = (e) => {
		const input = e.target.querySelector('.form-control');
		if (input) input.style.background = 'white';

		return e;
	};

	const dragOverHandler = (e) => {
		e.preventDefault();

		const input = e.target.querySelector('input');
		if (input) input.style.background = 'var(--bs-gray-200)';

		return e;
	};

	const dropHandler = (e, todo) => {
		e.preventDefault();

		setTodos(
			todos.map((t) => {
				if (t.id === todo.id) {
					return currentTodo;
				} else if (t.id === currentTodo.id) {
					return todo;
				}

				return t;
			})
		);

		return e;
	};

	return (
		<>
			<h2 className='mt-5 mb-3'>Todo List</h2>

			<div data-testid='todo-list' className='todo-list list-group gx-2'>
				{filteredTodos.length
					? filteredTodos.map((item) => {
							return (
								<div
									onDragStart={(e) => dragStartHandler(e, item)}
									onDragLeave={(e) => dragLeaveHandler(e)}
									onDragEnd={(e) => dragEndHandler(e)}
									onDragOver={(e) => dragOverHandler(e)}
									onDrop={(e) => dropHandler(e, item)}
									draggable={true}
								>
									<Todo
										key={uuidv4()}
										todos={todos}
										setTodos={setTodos}
										todo={item}
										garbageTodos={garbageTodos}
										setGarbageTodos={setGarbageTodos}
									></Todo>
								</div>
							);
					  })
					: 'List is empty'}
			</div>
		</>
	);
};

export default TodoList;
