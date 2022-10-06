import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PersistenceService } from '../../domain/services/persistenceService';

const Home = () => {
	const navigate = useNavigate();

	const formRef = useRef('');
	const [inputValue, setInputValue] = useState('');
	const [isAName, setIsAName] = useState(false);
	const [firstClick, setFirstClick] = useState(false);

	const onChange = (e) => {
		setInputValue(e.target.value);
		if (e.target.value !== '') {
			setIsAName(false);
		} else {
			setIsAName(true);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setFirstClick(true);
		if (inputValue === '') {
			return;
		}
		const user = {
			name: inputValue,
			points: 0,
			autoClickers: 0
		};
		const users = await PersistenceService.get('users');
		PersistenceService.persist('loggedUserName', user.name);
		if (users === null) {
			const emptyUsersArray = [];
			PersistenceService.persist('users', [...emptyUsersArray, user]);
			navigate('/game');
		} else {
			const joiningUser = users.filter((userToFind) => userToFind.name === inputValue);
			if (!joiningUser.length) {
				PersistenceService.persist('users', [...users, user]);
				navigate('/game');
				setIsAName(false);
			} else {
				navigate('/game');
			}
		}
	};

	const showError = firstClick && !inputValue;

	return (
		<div className="home_container-position">
			<div className="home_app-name" data-testid="text-home-app-name">
				Clicker!
			</div>
			<div className="home_mouse-buttons">
				<div className="home_mouse-left-button"></div>
				<div className="home_mouse-right-button"></div>
			</div>
			<form className="home_body-container" onSubmit={handleSubmit} ref={formRef}>
				<div data-testid="text-home">Create new Player</div>
				<div>
					<input
						className={showError ? 'input-error' : 'input-ok'}
						type="text"
						data-testid="input-home"
						data-cy="input-home"
						placeholder={showError ? 'Name *' : 'Name'}
						onChange={onChange}
					/>
				</div>
				{showError ? <small>Required field</small> : null}
				<div>
					<button data-testid="button-home" data-cy="button-home" disabled={isAName} type="submit">
						Join
					</button>
				</div>
			</form>
		</div>
	);
};

export default Home;
