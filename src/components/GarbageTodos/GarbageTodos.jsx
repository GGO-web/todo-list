import React from 'react';

import { v4 as uuidv4 } from 'uuid';

import GarbageTodo from './components/GarbageTodo/GarbageTodo';

const GarbageTodos = ({ todos, setTodos, garbageTodos, setGarbageTodos }) => {
	return (
		<>
			<h2 className='mt-5 mb-3'>Garbage Collection</h2>

			<div className='garbage-list list-group gx-2'>
				{garbageTodos.map((item) => {
					return (
						<GarbageTodo
							key={uuidv4()}
							todos={todos}
							setTodos={setTodos}
							garbageTodos={garbageTodos}
							setGarbageTodos={setGarbageTodos}
							todo={item}
						></GarbageTodo>
					);
				})}
			</div>
		</>
	);
};

export default GarbageTodos;
