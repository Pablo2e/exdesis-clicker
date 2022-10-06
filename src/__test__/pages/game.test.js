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
		expect(screen.getByTestId('text-game-container')).toBeInTheDocument();
		expect(screen.getByTestId('text-header-game-name')).toBeInTheDocument();
		expect(screen.getByTestId('text-body-your-score')).toBeInTheDocument();
		expect(screen.getByTestId('text-body-game-ranking')).toBeInTheDocument();
	});
});
