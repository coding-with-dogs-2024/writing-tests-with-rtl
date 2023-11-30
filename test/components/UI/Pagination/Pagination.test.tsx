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
])(
	'Pagination buttons %s',
	async (buttonsToShow: ReadonlyArray<ButtonToShow>) => {
		doRender(...buttonsToShow);

		const buttons = screen.queryAllByRole('button');
		expect(buttons).toHaveLength(buttonsToShow.length);

		const previousButton = screen.queryByRole('button', {
			name: 'Previous'
		});
		const nextButton = screen.queryByRole('button', {
			name: 'Next'
		});

		if (buttonsToShow.includes('previous')) {
			expect(previousButton).toBeVisible();
			if (!previousButton)
				throw new Error('Previous button should not be nullable');
			await userEvent.click(previousButton);
			expect(previousPage).toHaveBeenCalledOnce();
		} else {
			expect(previousButton).not.toBeInTheDocument();
		}

		if (buttonsToShow.includes('next')) {
			expect(nextButton).toBeVisible();
			if (!nextButton)
				throw new Error('Next button should not be nullable');
			await userEvent.click(nextButton);
			expect(nextPage).toHaveBeenCalledOnce();
		} else {
			expect(nextButton).not.toBeInTheDocument();
		}
	}
);

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
