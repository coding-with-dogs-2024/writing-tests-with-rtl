import { render, screen } from '@testing-library/react';

test('Hello World renders', () => {
	render(<h1>Hello World</h1>);
	expect(screen.getByText('Hello World')).toBeVisible();
});
