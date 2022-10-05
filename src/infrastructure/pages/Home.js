import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PersistenceService } from '../../domain/services/persistenceService';

const Home = () => {
	const navigate = useNavigate();

	const formRef = useRef('');
	const refValue = useRef('');
	const [isAName, setIsAName] = useState(false);
	const users = PersistenceService.get('users');

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
			autoclicker: false
		};
		const joiningUser = users.filter((user) => user.name === refValue.current);
		if (joiningUser[0].name) {
			PersistenceService.persist('user', user);
			navigate('/game');
			setIsAName(false);
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
