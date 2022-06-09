import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';

import GarbageTodos from '../GarbageTodos';

it('should display description when GarbageTodos is empty', () => {
	render(
		<GarbageTodos
			todos={[]}
			setTodos={jest.fn()}
			garbageTodos={[]}
			setGarbageTodos={[]}
		></GarbageTodos>
	);

	expect(screen.getByText(/garbage list is empty/i)).toBeInTheDocument();
});

it('should open GarbageTodos when button is pressed', () => {
	render(
		<GarbageTodos
			todos={[]}
			setTodos={jest.fn()}
			garbageTodos={[]}
			setGarbageTodos={[]}
		></GarbageTodos>
	);

	fireEvent.click(screen.getByText(/garbage collection/i));

	expect(screen.getByTestId('garbage-collapse-icon')).toHaveClass('active');
});

it('should render correct count of garbage todos', () => {
	render(
		<GarbageTodos
			todos={[]}
			setTodos={jest.fn()}
			garbageTodos={[
				{
					id: 'id1',
					value: 'test todo #1',
					completed: true,
				},
			]}
			setGarbageTodos={[]}
		></GarbageTodos>
	);

	expect(screen.getByTestId('garbage-list').childElementCount).toEqual(1);
});
