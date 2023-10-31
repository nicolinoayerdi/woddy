import { ReactElement } from 'react';

export const Card = ({ children, className, ...rest }: { children: ReactElement; className?: string }) => (
	<div {...rest} className={`bg-white rounded-lg p-4 shadow-md mb-4 ${className}`}>
		{children}
	</div>
);
