import { ReactNode } from 'react';

export const Tag = ({ children }: { children: ReactNode }) => (
	<div className='rounded-2xl bg-slate-400 text-sm text-white px-2 w-fit'>{children}</div>
);
