'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { Button } from '../components/Button';
import { deleteRoutine } from '../actions/deleteRoutine';
// @ts-expect-error
import { experimental_useFormState as useFormState, experimental_useFormStatus as useFormStatus } from 'react-dom';

interface RoutineCardProps {
	routineId: string;
	title?: string;
	content?: string;
	subtitle?: string;
	link: { url: string; label?: string };
}

export const RoutineCard = ({ routineId, title, subtitle, content, link }: RoutineCardProps) => {
	const [state, formAction] = useFormState((prevState: any, formData: FormData) => deleteRoutine({ routineId }), {
		message: null,
	});

	return (
		<form action={formAction}>
			<div className='flex flex-col bg-white border shadow-sm rounded-xl p-4 md:p-5 dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]'>
				{title && <h3 className='text-lg font-bold text-gray-800 dark:text-white'>{title}</h3>}
				{subtitle && (
					<p className='mt-1 text-xs font-medium uppercase text-gray-500 dark:text-gray-500'>{subtitle}</p>
				)}
				{content && <p className='mt-2 text-gray-800 dark:text-gray-400'>{content}</p>}
				<div className='flex flex-row justify-between items-center mt-5'>
					{link && (
						<Link
							className='inline-flex items-center gap-2 text-sm font-medium text-blue-500 hover:text-blue-700'
							href={link.url}>
							{link.label || link.url}
							<svg
								className='w-2.5 h-auto'
								width='16'
								height='16'
								viewBox='0 0 16 16'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14'
									stroke='currentColor'
									stroke-width='2'
									stroke-linecap='round'
								/>
							</svg>
						</Link>
					)}
					<Button type='submit'>Delete</Button>
				</div>
			</div>
		</form>
	);
};
