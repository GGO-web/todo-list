import React, { useState } from 'react';
import { Button, Collapse } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-free-solid';

import './GarbageTodos.css';

import { v4 as uuidv4 } from 'uuid';

import GarbageTodo from './components/GarbageTodo/GarbageTodo';

const GarbageTodos = ({ todos, setTodos, garbageTodos, setGarbageTodos }) => {
	const [garbageIsOpen, setGarbageIsOpen] = useState(false);

	return (
		<>
			<Button
				color='primary'
				className='mt-5 mb-3'
				onClick={() => setGarbageIsOpen(!garbageIsOpen)}
			>
				Garbage Collection
				<FontAwesomeIcon
					data-testid='garbage-collapse-icon'
					style={{ marginLeft: '5px' }}
					className={garbageIsOpen ? 'active' : ''}
					icon='fa-solid fa-chevron-down'
				/>
			</Button>

			<Collapse isOpen={garbageIsOpen}>
				<div
					data-testid='garbage-list'
					className='garbage-list list-group gx-2'
				>
					{garbageTodos.length
						? garbageTodos.map((item) => {
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
						  })
						: 'Garbage List is empty'}
				</div>
			</Collapse>
		</>
	);
};

export default GarbageTodos;
