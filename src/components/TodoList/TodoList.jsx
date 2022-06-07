import React from 'react';
import Todo from './components/Todo/Todo';

import { v4 as uuidv4 } from 'uuid';

const TodoList = ({ todos, setTodos }) => {
	return (
		<div className='todo-list list-group gx-2'>
			{todos.map((item) => {
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
