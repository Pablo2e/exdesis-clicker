import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PersistenceService } from '../../domain/services/persistenceService';

const Home = React.lazy(() => import('../pages/Home'));
const Game = React.lazy(() => import('../pages/Game'));

const Loading = () => <p>Loading ...</p>;

export const NavigationRoutes = () => {
	const users = [
		{ name: 'foo', points: 0, autoClickers: 0 },
		{ name: 'bar', points: 0, autoClickers: 0 },
		{ name: 'foobar', points: 0, autoClickers: 0 }
	];

	const setUsers = () => {
		PersistenceService.persist('users', users);
		console.log(PersistenceService.get('users'));
	};

	useEffect(() => {
		setUsers();
	});

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={
							<Suspense fallback={<Loading />}>
								<Home />
							</Suspense>
						}
					/>
					<Route
						path="/game"
						element={
							<Suspense fallback={<Loading />}>
								<Game />
							</Suspense>
						}
					/>
					<Route path="*" element={<Home />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};
