import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PersistenceService } from '../../domain/services/persistenceService';

const Home = () => {
	const navigate = useNavigate();

	const formRef = useRef('');
	const refValue = useRef('');
	const [isAName, setIsAName] = useState(false);

	const onChange = (e) => {
		refValue.current = e.target.value;
		if (refValue.current !== '') {
			setIsAName(false);
		} else {
			setIsAName(true);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const user = {
			name: refValue.current,
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
			const joiningUser = users.filter((userToFind) => userToFind.name === refValue.current);
			if (!joiningUser.length) {
				PersistenceService.persist('users', [...users, user]);
				navigate('/game');
				setIsAName(false);
			} else {
				navigate('/game');
			}
		}
	};

	return (
		<div className="home_container-position">
			<form className="home_container" onSubmit={handleSubmit} ref={formRef}>
				<div data-testid="text-home">Create new Player</div>
				<div>
					<input type="text" data-testid="input-home" data-cy="input-home" placeholder="Name" onChange={onChange} />
				</div>
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
