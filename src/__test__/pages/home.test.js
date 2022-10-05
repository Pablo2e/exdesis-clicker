import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../../infrastructure/pages/Home';

describe('<Home />', () => {
	test('should render Home', () => {
		render(
			<BrowserRouter>
				<Home />
			</BrowserRouter>
		);
		expect(screen.getByTestId('text-home')).toBeInTheDocument();
	});
	test('should find text values in Home', async () => {
		render(
			<BrowserRouter>
				<Home />
			</BrowserRouter>
		);
		expect(screen.getByText(/Home/i)).toBeTruthy();
	});
});