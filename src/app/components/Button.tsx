import { ButtonHTMLAttributes } from 'react';

export const Button = ({ children, ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) => (
	<button
		className='bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:border-cyan-700'
		{...rest}>
		{children}
	</button>
);
