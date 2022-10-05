import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { NavigationRoutes } from './infrastructure/navigation/NavigationRoutes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<NavigationRoutes />
	</React.StrictMode>
);
