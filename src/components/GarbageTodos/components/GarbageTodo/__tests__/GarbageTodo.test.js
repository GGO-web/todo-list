import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';

import GarbageTodo from '../GarbageTodo';

it('should be able to change the value of todo', () => {
	render(
		<GarbageTodo
			todos={[]}
			setTodos={jest.fn()}
			todo={{ id: 'test id', value: 'testing', completed: false }}
			garbageTodos={[]}
			setGarbageTodos={jest.fn()}
		></GarbageTodo>
	);

	expect(screen.getByRole('textbox')).toHaveValue('testing');

	fireEvent.change(screen.getByRole('textbox'), {
		target: { value: 'test todo' },
	});

	expect(screen.getByRole('textbox')).toHaveValue('test todo');
});

it('should don`t change the value of todo if the user clear entire text', () => {
	render(
		<GarbageTodo
			todos={[]}
			setTodos={jest.fn()}
			todo={{ id: 'test id', value: 'test todo', completed: false }}
			garbageTodos={[
				{ id: 'test id', value: 'test todo', completed: false },
			]}
			setGarbageTodos={jest.fn()}
		></GarbageTodo>
	);

	fireEvent.change(screen.getByRole('textbox'), {
		target: { value: '' },
	});

	fireEvent.blur(screen.getByRole('textbox'));

	expect(screen.getByRole('textbox').value).toBe('test todo');
});

it('should change the value of todo if the user clear a part of text', () => {
	const mockedSetGarbageTodos = jest.fn();

	render(
		<GarbageTodo
			todos={[]}
			setTodos={jest.fn()}
			todo={{ id: 'test id #1', value: 'test todo #1', completed: false }}
			garbageTodos={[
				{ id: 'test id #1', value: 'test todo #1', completed: false },
				{ id: 'test id #2', value: 'test todo #2', completed: false },
			]}
			setGarbageTodos={mockedSetGarbageTodos}
		></GarbageTodo>
	);

	fireEvent.change(screen.getByRole('textbox'), {
		target: { value: 'test to' },
	});

	fireEvent.blur(screen.getByRole('textbox'));

	expect(screen.getByRole('textbox')).toHaveValue('test to');
	expect(mockedSetGarbageTodos).toHaveBeenCalledWith([
		{ id: 'test id #1', value: 'test to', completed: false },
		{ id: 'test id #2', value: 'test todo #2', completed: false },
	]);
});

it('should mark as complete when a complete button is pressed', () => {
	const mockedSetGarbageTodos = jest.fn();

	render(
		<GarbageTodo
			todos={[]}
			setTodos={jest.fn()}
			todo={{ id: 'test id #1', value: 'testing #1', completed: false }}
			garbageTodos={[
				{ id: 'test id #1', value: 'testing #1', completed: false },
				{ id: 'test id #2', value: 'testing #2', completed: false },
			]}
			setGarbageTodos={mockedSetGarbageTodos}
		></GarbageTodo>
	);

	fireEvent.click(screen.getByTestId('garbage-mark-button'));

	expect(mockedSetGarbageTodos).toHaveBeenCalledWith([
		{ id: 'test id #1', value: 'testing #1', completed: true },
		{ id: 'test id #2', value: 'testing #2', completed: false },
	]);
});

it('should filter GarbageTodos when a restore button is pressed', () => {
	const mockedSetTodos = jest.fn();
	const mockedSetGarbageTodos = jest.fn();

	render(
		<GarbageTodo
			todos={[]}
			setTodos={mockedSetTodos}
			todo={{ id: 'test id', value: 'testing', completed: false }}
			garbageTodos={[{ id: 'test id', value: 'testing', completed: false }]}
			setGarbageTodos={mockedSetGarbageTodos}
		></GarbageTodo>
	);

	fireEvent.click(screen.getByTestId('garbage-restore-button'));

	expect(mockedSetTodos).toBeCalledWith([
		{ id: 'test id', value: 'testing', completed: false },
	]);
	expect(mockedSetGarbageTodos).lastCalledWith([]);
});

it('should filter GarbageTodos when a remove button is pressed', () => {
	const mockedSetTodos = jest.fn();
	const mockedSetGarbageTodos = jest.fn();

	render(
		<GarbageTodo
			todos={[]}
			setTodos={mockedSetTodos}
			todo={{ id: 'test id', value: 'testing', completed: false }}
			garbageTodos={[{ id: 'test id', value: 'testing', completed: false }]}
			setGarbageTodos={mockedSetGarbageTodos}
		></GarbageTodo>
	);

	fireEvent.click(screen.getByText(/remove/i));

	expect(mockedSetTodos).not.toBeCalled();
	expect(mockedSetGarbageTodos).lastCalledWith([]);
});
