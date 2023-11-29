import { render, screen } from '@testing-library/react';
import { Pagination } from '../../../../src/components/UI/Pagination';
import type { MockedFunction } from 'vitest';
import { userEvent } from '@testing-library/user-event';

const previousPage: MockedFunction<() => void> = vi.fn();
const nextPage: MockedFunction<() => void> = vi.fn();

type ButtonToShow = 'previous' | 'next';

const doRender = (...buttonsToShow: ReadonlyArray<ButtonToShow>) =>
	render(
		<Pagination
			showPreviousPage={buttonsToShow.includes('previous')}
			showNextPage={buttonsToShow.includes('next')}
			previousPage={previousPage}
			nextPage={nextPage}
		/>
	);

beforeEach(() => {
	vi.clearAllMocks();
});

test.each<[ReadonlyArray<ButtonToShow>]>([
	[[]],
	[['previous']],
	[['next']],
	[['previous', 'next']]
])('Pagination buttons %s', (buttonsToShow: ReadonlyArray<ButtonToShow>) => {
	doRender(...buttonsToShow);

	const buttons = screen.getAllByRole('button');
	expect(buttons).toHaveLength(buttonsToShow.length);
});

test('Pagination with the Previous button', async () => {
	doRender('previous');
	const buttons = screen.getAllByRole('button');
	expect(buttons).toHaveLength(1);
	expect(buttons[0]).toHaveTextContent('Previous');

	expect(screen.queryByText('Next')).not.toBeInTheDocument();

	await userEvent.click(buttons[0]);
	expect(previousPage).toHaveBeenCalledOnce();
});

test('Pagination with the Next button', async () => {
	doRender('next');
	const buttons = screen.getAllByRole('button');
	expect(buttons).toHaveLength(1);
	expect(buttons[0]).toHaveTextContent('Next');

	expect(screen.queryByText('Previous')).not.toBeInTheDocument();

	await userEvent.click(buttons[0]);
	expect(nextPage).toHaveBeenCalledOnce();
	expect(previousPage).not.toHaveBeenCalledOnce();
});
