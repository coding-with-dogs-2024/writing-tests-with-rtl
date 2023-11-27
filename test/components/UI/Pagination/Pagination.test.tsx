import { render, screen } from '@testing-library/react';
import { Pagination } from '../../../../src/components/UI/Pagination';
import type { MockedFunction } from 'vitest';
import { userEvent } from '@testing-library/user-event';

test('Pagination with the Previous button', async () => {
	const previousPage: MockedFunction<() => void> = vi.fn();
	const nextPage: MockedFunction<() => void> = vi.fn();
	render(
		<Pagination
			showPreviousPage={true}
			showNextPage={false}
			previousPage={previousPage}
			nextPage={nextPage}
		/>
	);
	const buttons = screen.getAllByRole('button');
	expect(buttons).toHaveLength(1);
	expect(buttons[0]).toHaveTextContent('Previous');

	expect(screen.queryByText('Next')).not.toBeInTheDocument();

	await userEvent.click(buttons[0]);
	expect(previousPage).toHaveBeenCalledOnce();
});

test('Pagination with the Next button', async () => {
	const previousPage: MockedFunction<() => void> = vi.fn();
	const nextPage: MockedFunction<() => void> = vi.fn();
	render(
		<Pagination
			showPreviousPage={false}
			showNextPage={true}
			previousPage={previousPage}
			nextPage={nextPage}
		/>
	);
	const buttons = screen.getAllByRole('button');
	expect(buttons).toHaveLength(1);
	expect(buttons[0]).toHaveTextContent('Next');

	expect(screen.queryByText('Previous')).not.toBeInTheDocument();

	await userEvent.click(buttons[0]);
	expect(nextPage).toHaveBeenCalledOnce();
});
