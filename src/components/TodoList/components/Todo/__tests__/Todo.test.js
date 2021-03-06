import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';

import Todo from '../Todo';

it('should be able to change the value of todo', () => {
	render(
		<Todo
			todos={[]}
			setTodos={jest.fn()}
			todo={{ id: 'test id', value: 'testing', completed: false }}
			garbageTodos={[]}
			setGarbageTodos={jest.fn()}
		></Todo>
	);

	expect(screen.getByRole('textbox')).toHaveValue('testing');

	fireEvent.change(screen.getByRole('textbox'), {
		target: { value: 'test todo' },
	});

	expect(screen.getByRole('textbox')).toHaveValue('test todo');
});

it('should don`t change the value of todo if the user clear entire text', () => {
	render(
		<Todo
			todos={[{ id: 'test id', value: 'test todo', completed: false }]}
			setTodos={jest.fn()}
			todo={{ id: 'test id', value: 'test todo', completed: false }}
			garbageTodos={[]}
			setGarbageTodos={jest.fn()}
		></Todo>
	);

	fireEvent.change(screen.getByRole('textbox'), {
		target: { value: '' },
	});

	fireEvent.blur(screen.getByRole('textbox'));

	expect(screen.getByRole('textbox').value).toBe('test todo');
});

it('should change the value of todo if the user clear a part of text', () => {
	const mockedSetTodos = jest.fn();

	render(
		<Todo
			todos={[
				{ id: 'test id #1', value: 'test todo #1', completed: false },
				{ id: 'test id #2', value: 'test todo #2', completed: false },
			]}
			setTodos={mockedSetTodos}
			todo={{ id: 'test id #1', value: 'test todo #1', completed: false }}
			garbageTodos={[]}
			setGarbageTodos={jest.fn()}
		></Todo>
	);

	fireEvent.change(screen.getByRole('textbox'), {
		target: { value: 'test to' },
	});

	fireEvent.blur(screen.getByRole('textbox'));

	expect(screen.getByRole('textbox')).toHaveValue('test to');
	expect(mockedSetTodos).toHaveBeenCalledWith([
		{ id: 'test id #1', value: 'test to', completed: false },
		{ id: 'test id #2', value: 'test todo #2', completed: false },
	]);
});

it('should mark as complete when a complete button is pressed', () => {
	const mockedSetTodos = jest.fn();

	render(
		<Todo
			todos={[
				{ id: 'test id #1', value: 'testing #1', completed: false },
				{ id: 'test id #2', value: 'testing #2', completed: false },
			]}
			setTodos={mockedSetTodos}
			todo={{ id: 'test id #1', value: 'testing #1', completed: false }}
			garbageTodos={[]}
			setGarbageTodos={jest.fn()}
		></Todo>
	);

	fireEvent.click(screen.getByTestId('todo-mark-button'));

	expect(mockedSetTodos).toHaveBeenCalledWith([
		{ id: 'test id #1', value: 'testing #1', completed: true },
		{ id: 'test id #2', value: 'testing #2', completed: false },
	]);
});

it('should remove item from TodoList and move it to GarbageTodos', () => {
	const mockedSetTodos = jest.fn();
	const mockedSetGarbageTodos = jest.fn();

	render(
		<Todo
			todos={[{ id: 'test id', value: 'testing', completed: false }]}
			setTodos={mockedSetTodos}
			todo={{ id: 'test id', value: 'testing', completed: false }}
			garbageTodos={[]}
			setGarbageTodos={mockedSetGarbageTodos}
		></Todo>
	);

	fireEvent.click(screen.getByTestId('todo-remove-button'));

	expect(mockedSetTodos).lastCalledWith([]);
	expect(mockedSetGarbageTodos).toBeCalledWith([
		{ id: 'test id', value: 'testing', completed: false },
	]);
});
