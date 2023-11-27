import {render, screen} from '@testing-library/react';
import { Pagination } from '../../../../src/components/UI/Pagination';
import type {MockedFunction} from 'vitest';

test('Pagination with the Previous button', () => {
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
});

test.fails('Pagination with the Next button');
