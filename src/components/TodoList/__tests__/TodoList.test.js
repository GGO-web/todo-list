import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';

import TodoList from '../TodoList';

it('should display description when TodoList is empty', () => {
	render(
		<TodoList
			filteredTodos={[]}
			todos={[]}
			setTodos={jest.fn()}
			garbageTodos={[]}
			setGarbageTodos={jest.fn()}
		></TodoList>
	);

	expect(screen.getByText(/list is empty/i)).toBeInTheDocument();
});

it('should display corrent count of todo items', () => {
	render(
		<TodoList
			filteredTodos={[
				{
					id: 'id1',
					value: 'test todo #1',
					completed: false,
				},
				{
					id: 'id2',
					value: 'test todo #2',
					completed: false,
				},
			]}
			todos={[]}
			setTodos={jest.fn()}
			garbageTodos={[]}
			setGarbageTodos={jest.fn()}
		></TodoList>
	);

	expect(screen.getByTestId('todo-list').childElementCount).toEqual(2);
});
