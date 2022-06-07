import React from 'react';
import Todo from './components/Todo/Todo';

import { v4 as uuidv4 } from 'uuid';

const TodoList = ({ filteredTodos, setFilteredTodos, todos, setTodos }) => {
	return (
		<div className='todo-list list-group gx-2'>
			{filteredTodos.map((item) => {
				return (
					<Todo
						key={uuidv4()}
						todos={todos}
						setTodos={setTodos}
						todo={item}
					></Todo>
				);
			})}
		</div>
	);
};

export default TodoList;
