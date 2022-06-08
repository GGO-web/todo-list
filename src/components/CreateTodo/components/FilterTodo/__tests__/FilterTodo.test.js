import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';

import TodoList from '../../../../TodoList/TodoList';
import FilterTodo from '../FilterTodo';

const mockedFilteredTodos = [
	{
		value: 'abc',
		completed: false,
		id: 'id1',
	},
	{
		value: 'abcd',
		completed: true,
		id: 'id2',
	},
	{
		value: 'abcde',
		completed: true,
		id: 'id3',
	},
];

const setFilteredTodos = jest.fn();

beforeEach(() => {
	render(
		<>
			<FilterTodo
				setFilteredTodos={setFilteredTodos}
				todos={mockedFilteredTodos}
			></FilterTodo>
			<TodoList
				filteredTodos={mockedFilteredTodos}
				todos={[]}
				setTodos={jest.fn()}
				garbageTodos={[]}
				setGarbageTodos={[]}
			></TodoList>
		</>
	);
});

it('should render completed todos when dropdown value is changed', () => {
	const filterTodo = screen.getByTestId('filter-todo');

	fireEvent.change(filterTodo, { target: { value: 'completed' } });

	expect(setFilteredTodos).toHaveBeenLastCalledWith([
		{
			value: 'abcd',
			completed: true,
			id: 'id2',
		},
		{
			value: 'abcde',
			completed: true,
			id: 'id3',
		},
	]);
});

it('should render uncompleted todos when dropdown value is changed', () => {
	const filterTodo = screen.getByTestId('filter-todo');

	fireEvent.change(filterTodo, { target: { value: 'uncompleted' } });

	expect(setFilteredTodos).toHaveBeenLastCalledWith([
		{
			value: 'abc',
			completed: false,
			id: 'id1',
		},
	]);
});
