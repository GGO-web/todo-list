import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';

import CreateTodo from '../CreateTodo';

// mock uuid generated unique id
jest.mock('uuid', () => ({
	v4: () => 'test id',
}));

const mockedSetTodos = jest.fn();

beforeEach(() => {
	render(
		<CreateTodo
			filteredTodos={[]}
			setFilteredTodos={jest.fn()}
			todos={[]}
			setTodos={mockedSetTodos}
		></CreateTodo>
	);
});

it('should call function setTodos when item is added', async () => {
	// fire todo events
	fireEvent.change(screen.getByTestId('todo-input'), {
		target: { value: 'test todo item' },
	});
	expect(mockedSetTodos).toHaveBeenCalledTimes(0);
	fireEvent.submit(screen.getByTestId('create-todo-button'));

	// check if setTodos function is called with correct argument
	expect(mockedSetTodos).toHaveBeenCalledTimes(1);
	expect(mockedSetTodos).toHaveBeenCalledWith([
		{
			id: 'test id',
			value: 'test todo item',
			completed: false,
		},
	]);

	// after the form is submitted, check if the value is empty
	expect(screen.getByTestId('todo-input')).toHaveValue('');
});

it('Form submission should not call setTodos state if input field is empty', () => {
	fireEvent.submit(screen.getByTestId('create-todo-button'));
	expect(mockedSetTodos).not.toHaveBeenCalled();
});
