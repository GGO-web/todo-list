import React, { useEffect, useState } from 'react';

import { Input } from 'reactstrap';

const FilterTodo = ({ setFilteredTodos, todos }) => {
	const [dropdownValue, setDropdownValue] = useState('all');

	const filterTodoList = (e) => {
		const filterOption = e?.target.value;

		if (filterOption) {
			setDropdownValue(filterOption);
		}

		switch (e?.target.value || dropdownValue) {
			case 'completed':
				setFilteredTodos(todos.filter((todo) => todo.completed === true));
				break;
			case 'uncompleted':
				setFilteredTodos(todos.filter((todo) => todo.completed === false));
				break;
			default:
				setFilteredTodos(todos);
		}
	};

	useEffect(() => {
		filterTodoList();
	}, [todos]);

	return (
		<Input type={'select'} size='1' onChange={filterTodoList}>
			<option value={'all'}>All</option>
			<option value={'completed'}>Completed</option>
			<option value={'uncompleted'}>Uncompleted</option>
		</Input>
	);
};

export default FilterTodo;
