import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PersistenceService } from '../../domain/services/persistenceService';

const Game = () => {
	const userList = PersistenceService.get('users');
	const loggedUserName = PersistenceService.get('loggedUserName');
	const user = userList?.find(({ name }) => name === loggedUserName);
	const autoClickerBaseCost = 5;

	const topScores = userList?.sort((a, b) => b.points - a.points);
	let setIntervalFunction;

	const [counter, setCounter] = useState(user?.points);
	const [autoClickerBought, setAutoClickerBought] = useState(user?.autoClickers);
	const [showAutoClickerButton, setShowAutoClickerButton] = useState(false);
	const [showAutoClickersQuantity, setShowAutoClickersQuantity] = useState(false);
	const [notEnoughtPoints, setNotEnoughtPoints] = useState(false);

	const autoClickerCost = autoClickerBaseCost + autoClickerBaseCost * autoClickerBought;
	const intervalTime = 1000 / (autoClickerBought || 1);

	const usersUpdated = userList?.map((userToUpdate) => {
		if (userToUpdate.name === loggedUserName) {
			return { ...userToUpdate, autoClickers: autoClickerBought, points: counter };
		}
		return userToUpdate;
	});

	PersistenceService.persist('users', usersUpdated);

	const handleAdd = () => {
		setCounter((oldCounter) => {
			if (oldCounter >= autoClickerCost) setShowAutoClickerButton(true);
			if (oldCounter < autoClickerCost) {
				setNotEnoughtPoints(true);
			} else {
				setNotEnoughtPoints(false);
			}
			return oldCounter + 1;
		});
	};

	const updateUsersPoints = () => {
		setCounter((oldCounter) => {
			return oldCounter + 1;
		});
	};

	const addPointsAutomaticaly = () => {
		setIntervalFunction = setInterval(updateUsersPoints, intervalTime);
	};

	const buyAutoClickers = () => {
		setCounter((oldCounter) => {
			setAutoClickerBought((oldAutoClickerBought) => {
				const autoClickers = oldAutoClickerBought + 1;
				setShowAutoClickersQuantity(true);
				if (oldCounter < autoClickerCost) {
					setNotEnoughtPoints(true);
				}
				addPointsAutomaticaly();
				return autoClickers;
			});
			return oldCounter - autoClickerCost;
		});
		setNotEnoughtPoints(true);
	};

	const stopSetInterval = () => {
		clearInterval(setIntervalFunction);
		setIntervalFunction = null;
	};

	const transformScoreFormat = (value) => {
		const stringifiedNumber = value?.toString();
		let numberModified;
		if (stringifiedNumber?.length > 3) {
			numberModified = stringifiedNumber.slice(0, 1) + 'K';
		}
		if (stringifiedNumber?.length > 4) {
			numberModified = stringifiedNumber.slice(0, 2) + 'K';
		}
		if (stringifiedNumber?.length > 5) {
			numberModified = stringifiedNumber.slice(0, 3) + 'K';
		}
		if (stringifiedNumber?.length > 6) {
			numberModified = stringifiedNumber.slice(0, 1) + 'M';
		}
		if (stringifiedNumber?.length > 7) {
			numberModified = stringifiedNumber.slice(0, 2) + 'M';
		}
		return numberModified;
	};

	const checkValue = useCallback(() => {
		if (autoClickerCost <= counter) {
			setNotEnoughtPoints(false);
		}
	}, [autoClickerCost, counter]);

	useEffect(() => {
		checkValue();
	}, [checkValue]);

	return (
		<div className="game_container-position" data-testid="text-game-container">
			<div className="game_container-header">
				<div className="game_container_header-text-name" data-testid="text-header-game-name">
					Hi {user?.name}
				</div>
				<div>
					<Link to="/" className="game_container_header-link" data-cy="game-header-link-logout" onClick={stopSetInterval}>
						LogOut
					</Link>
				</div>
			</div>
			<div className="game_container-body">
				<div className="game_container_body-text-your-score" data-testid="text-body-your-score">
					<div className="game_container_body-text-your-score-items">
						<div>Your</div>
						<div>score:</div>
					</div>
					<div> {counter}</div>
				</div>
				<div className="game_container_body-text-your-score-modified" data-cy="game-container-body-text-your-score-modified">
					{transformScoreFormat(counter)}
				</div>
				{showAutoClickersQuantity ? (
					<div className="game_container_body-text-autoclickers-bought" data-testid="text-body-show-autoclickers-bought">
						<div className="game_container_body-text-autoclickers-bought-items">
							<div>AutoClickers</div>
							<div>Boutght:</div>
						</div>
						<div className="game_container_body-text-autoclickers-bought-value"> {autoClickerBought}</div>
					</div>
				) : null}
				<button className="game_container_body-button-add-point" data-cy="game-button-add-point" onClick={handleAdd}>
					Add 1 point
				</button>
				{showAutoClickerButton ? (
					<button className="game_container_body-button-buy-autoclicker" data-cy="game-button-buy-autoclicker" onClick={buyAutoClickers} disabled={notEnoughtPoints}>
						Buy an AutoClicker for {autoClickerCost} points
					</button>
				) : null}
				<div className="game_container_body-text-ranking" data-testid="text-body-game-ranking">
					Ranking:{' '}
					{topScores?.map(({ name, points }, index) => {
						return (
							<div key={index}>
								Name: {name} - Score: {points}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};
export default Game;
