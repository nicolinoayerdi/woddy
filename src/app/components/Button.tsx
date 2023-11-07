import { ButtonHTMLAttributes } from 'react';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	kind?: 'primary' | 'secondary';
}

export const Button = ({ children, className, kind, ...rest }: IButtonProps) => {
	if (!kind || kind === 'primary') {
		return (
			<button
				className={`${className} w-full bg-cyan-500 hover:bg-cyan-700 text-gray-50 font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring`}
				{...rest}>
				{children}
			</button>
		);
	}
	if (kind === 'secondary') {
		return (
			<button
				className={`${className} border bg-fuchsia-400 hover:bg-fuchsia-700 text-white py-2 px-4 font-semibold rounded-lg focus:outline-none focus:ring`}
				{...rest}>
				{children}
			</button>
		);
	}
};
