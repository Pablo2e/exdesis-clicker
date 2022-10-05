import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Home = React.lazy(() => import('../pages/Home'));
const Game = React.lazy(() => import('../pages/Game'));

const Loading = () => <p>Loading ...</p>;

export const Navigation = () => {
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
