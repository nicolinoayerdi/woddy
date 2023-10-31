import { ButtonHTMLAttributes } from 'react';

export const Button = ({ children, className, ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) => (
	<button
		className={`bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none  focus:ring  ${className}`}
		{...rest}>
		{children}
	</button>
);
