import { render, screen } from '@testing-library/react';
import { Button } from '../../infrastructure/components/Button';

describe('Button', () => {
	test('should render Button', () => {
		const text = 'Click me!';
		render(<Button text={text} />);
		expect(screen.getByText(text)).toBeInTheDocument();
	});

	test('should render Button with default text', () => {
		const defaultText = 'Click me!';
		render(<Button />);
		expect(screen.getByText(defaultText)).toBeInTheDocument();
	});

	test('should render Button disable', () => {
		const defaultText = 'Click me!';
		render(<Button disabled={true} />);
		expect(screen.getByText(defaultText)).toBeDisabled();
	});

	test('should render Button enable', () => {
		const defaultText = 'Click me!';
		render(<Button disabled={false} />);
		expect(screen.getByText(defaultText)).not.toBeDisabled();
	});
});
