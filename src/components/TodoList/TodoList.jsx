import React from 'react';
import Todo from './components/Todo/Todo';

import { v4 as uuidv4 } from 'uuid';

const TodoList = ({
	filteredTodos,
	todos,
	setTodos,
	garbageTodos,
	setGarbageTodos,
}) => {
	return (
		<>
			<h2 className='mt-5 mb-3'>Todo List</h2>

			<div className='todo-list list-group gx-2'>
				{filteredTodos.length
					? filteredTodos.map((item) => {
							return (
								<Todo
									key={uuidv4()}
									todos={todos}
									setTodos={setTodos}
									todo={item}
									garbageTodos={garbageTodos}
									setGarbageTodos={setGarbageTodos}
								></Todo>
							);
					  })
					: 'List is empty'}
			</div>
		</>
	);
};

export default TodoList;
