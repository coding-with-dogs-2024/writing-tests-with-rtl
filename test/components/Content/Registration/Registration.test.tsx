import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Registration } from '../../../../src/components/Content/Registration';

test('fill in the email field', async () => {
	render(<Registration />);
	const email = 'johndoe@gmail.com';
	const emailInput = screen.getByLabelText('Email');
	await userEvent.type(emailInput, email);
	expect(emailInput).toHaveValue(email);
});

test('fill in the daily post limit field', async () => {
	render(<Registration />);
	const postLimit = '123abc';
	const postLimitInput = screen.getByLabelText('Daily Post Limit');
	await userEvent.type(postLimitInput, postLimit);
	expect(postLimitInput).toHaveValue(123);
});

test('check the notification checkbox', async () => {
	render(<Registration />);
	const notificationCheckbox = screen.getByLabelText(
		'Receive Notifications?'
	);
	expect(notificationCheckbox).toBeChecked();
	await userEvent.click(notificationCheckbox);
	expect(notificationCheckbox).not.toBeChecked();
});

test('select the user type', async () => {
	render(<Registration />);
	const userTypeSelect = screen.getByLabelText('User Type');
	expect(userTypeSelect).toHaveValue('standard');
	expect(userTypeSelect).toHaveDisplayValue('Standard');
	await userEvent.selectOptions(userTypeSelect, 'admin');
	expect(userTypeSelect).toHaveValue('admin');
});

test('hovering', async () => {
	render(<Registration />);
	const hoverOutputTitle = screen.getByRole('heading', {
		level: 2,
		name: 'Hover Output'
	});
	const isHoveringText = screen.getByText('Is Hovering');
	expect(isHoveringText).not.toBeVisible();
	await userEvent.hover(hoverOutputTitle);
	expect(isHoveringText).toBeVisible();

	await userEvent.unhover(hoverOutputTitle);
	expect(isHoveringText).not.toBeVisible();
});
