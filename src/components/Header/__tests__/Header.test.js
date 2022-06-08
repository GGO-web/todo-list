import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import Header from '../Header';

it('should have heading with text "todo app"', () => {
	render(<Header></Header>);

	expect(screen.getByText(/todo app/i)).toBeInTheDocument();
});
