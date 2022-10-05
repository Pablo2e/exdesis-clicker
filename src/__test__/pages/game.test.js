import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Game from '../../infrastructure/pages/Game';

describe('<Game />', () => {
	test('should render Game', () => {
		render(
			<BrowserRouter>
				<Game />
			</BrowserRouter>
		);
		expect(screen.getByTestId('text-game')).toBeInTheDocument();
	});
	test('should find text values in Game', async () => {
		render(
			<BrowserRouter>
				<Game />
			</BrowserRouter>
		);
		expect(screen.getByText(/Game/i)).toBeTruthy();
	});
});
