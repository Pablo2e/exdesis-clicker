import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PersistenceService } from '../../domain/services/persistenceService';

const Game = () => {
	const users = PersistenceService.get('users');
	const loggedUserName = PersistenceService.get('loggedUserName');
	const loggedUser = users?.filter((userToFind) => userToFind.name === loggedUserName);
	const user = loggedUser[0];
	const autoClickerBaseCost = 5;
	const autoClickerCost = autoClickerBaseCost + autoClickerBaseCost * user.autoClickers;

	const topScores = users.sort((a, b) => b.points - a.points).slice(0, 3);

	const [counter, setCounter] = useState(user.points);
	const [setIntervalTime, setSetIntervalTime] = useState(1000);
	const [showAutoClickerButton, setShowAutoClickerButton] = useState(false);
	const [showAutoClickersQuantity, setShowAutoClickersQuantity] = useState(false);
	const [notEnoughtPoints, setNotEnoughtPoints] = useState(false);

	const handleAdd = () => {
		setCounter(counter + 1);
		if (counter >= autoClickerCost) setShowAutoClickerButton(true);
		if (counter < autoClickerCost) {
			setNotEnoughtPoints(true);
		} else {
			setNotEnoughtPoints(false);
		}
		const newUserPoints = (user.points = counter + 1);
		const newAutoClickersQuantity = user.autoClickers;
		const usersUpdated = users.map((userToUpdate) => {
			if (userToUpdate.name === loggedUserName) {
				return { ...userToUpdate, points: newUserPoints, autoClickers: newAutoClickersQuantity };
			}
			return userToUpdate;
		});
		PersistenceService.persist('users', usersUpdated);
	};

	const updateUsersPoints = async () => {
		let newUserPoints = (user.points += 1);
		const usersUpdated = await users.map((userToUpdate) => {
			if (userToUpdate.name === loggedUserName) {
				console.log(userToUpdate.points, newUserPoints);
				return { ...userToUpdate, points: newUserPoints };
			}
			return userToUpdate;
		});
		PersistenceService.persist('users', usersUpdated);
		setCounter(user.points);
	};

	const addPointsAutomaticaly = () => {
		if (user.autoClickers !== 0) {
			setSetIntervalTime(setIntervalTime * user.autoClickers);
		}
		setInterval(updateUsersPoints, setIntervalTime);
	};

	const autoClickerBought = () => {
		const newScore = (user.points = counter - autoClickerCost);
		console.log(newScore);
		const autoClickerAdded = (user.autoClickers += 1);
		const usersUpdated = users.map((userToUpdate) => {
			if (userToUpdate.name === loggedUserName) {
				return { ...userToUpdate, autoClickers: autoClickerAdded };
			}
			return userToUpdate;
		});
		PersistenceService.persist('users', usersUpdated);
		setCounter(counter - autoClickerCost);
		setShowAutoClickersQuantity(true);
		if (user.points < autoClickerCost) {
			setNotEnoughtPoints(true);
		}
		addPointsAutomaticaly();
	};

	return (
		<div className="game_container-position" data-testid="text-game">
			<div className="game_container-header">
				<div className="game_header-text">Hi {user.name}</div>
				<div>
					<Link to="/" className="game_container-header-link">
						LogOut
					</Link>
				</div>
			</div>
			<div className="game_container-body">
				<div className="game_container-body-scores" data-testid="text-top-scores">
					Top 3 scores:&nbsp;{' '}
					{topScores.map(({ name, points }) => {
						return (
							<div>
								Name: {name} - Score: {points}
								&nbsp;
							</div>
						);
					})}
				</div>
				<div data-testid="text-your-score">Your score: {counter}</div>
				{showAutoClickersQuantity ? <div>AutoClickers Boutght: {user.autoClickers}</div> : null}
				<button onClick={handleAdd}>Add 1 point</button>
				{showAutoClickerButton ? (
					<button onClick={autoClickerBought} disabled={notEnoughtPoints}>
						Buy an AutoClicker for {autoClickerCost} points
					</button>
				) : null}
			</div>
		</div>
	);
};
export default Game;
