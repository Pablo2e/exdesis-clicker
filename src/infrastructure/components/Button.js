import React from 'react';

export const Button = ({ text, children, disabled, datacy }) => {
	return (
		<button data-cy={datacy} disabled={disabled}>
			{text ? text : children ? children : 'Click me!'}
		</button>
	);
};
