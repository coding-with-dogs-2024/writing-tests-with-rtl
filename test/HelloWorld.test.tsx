import { render, screen } from '@testing-library/react';

const HelloWorld = () => (
	<div>
		<h1>Hello World</h1>
		<div className="spinning-progressbar" role="progressbar" />
		<img alt="My Special Pic" src="/some/image" />
		<div>
			<label htmlFor="text-field">The Text Field</label>
			<input
				id="text-field"
				type="text"
				placeholder="The text field placeholder"
			/>
		</div>
		<div>
			<label htmlFor="select-field">The Select Field</label>
			<select id="select-field" value="first">
				<option value="first">First Option</option>
				<option value="second">Second Option</option>
			</select>
		</div>
		<span title="This is the extra tooltip info">Here is a tooltip</span>
		<span data-testid="random-text">Random text</span>
		<p>Hello Universe</p>
		<p>Hello Universe</p>
	</div>
);

test('Hello World renders', async () => {
	render(<HelloWorld />);
	expect(screen.getByText('Hello World')).toBeVisible();
	expect(screen.getByRole('progressbar')).toBeVisible();
	expect(screen.getByLabelText('The Select Field')).toBeVisible();
	expect(
		screen.getByPlaceholderText('The text field placeholder')
	).toBeVisible();
	expect(screen.getByDisplayValue('First Option')).toBeVisible();
	expect(screen.getByAltText('My Special Pic')).toBeVisible();
	expect(screen.getByTitle('This is the extra tooltip info')).toBeVisible();
	expect(screen.getByTestId('random-text')).toBeVisible();

	expect(screen.getAllByText('Hello Universe')).toHaveLength(2);

	expect(screen.queryByText('Foo')).not.toBeInTheDocument();

	const element = await screen.findByText('Hello World');
	expect(element).toBeVisible();
});
