'use client';

import { createRoutine } from '@/app/actions/createRoutine';
import { Button } from '@/app/components/Button';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
// @ts-expect-error
import { experimental_useFormState as useFormState, experimental_useFormStatus as useFormStatus } from 'react-dom';

const Label = ({ children, htmlFor }: { children: ReactNode; htmlFor: string }) => (
	<label className='text-gray-700 text-sm font-bold mb-1' htmlFor={htmlFor}>
		{children}
	</label>
);

export default function CreateRoutine() {
	const [state, formAction] = useFormState(createRoutine, {
		message: null,
		routineId: null,
	});
	const { pending } = useFormStatus();

	return (
		<div className='flex flex-col w-full'>
			<form className='flex flex-col gap-3' action={formAction}>
				{state.routineId && (
					<>
						<div>{state.message}</div>
						<Link href={`/routines/${state.routineId}`}>Go to routine</Link>
					</>
				)}
				<fieldset className='flex flex-col'>
					<Label htmlFor='title'>Title</Label>
					<input
						className='w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:border-cyan-500'
						type='text'
						id='title'
						name='title'
						placeholder='Hypertrophy'
					/>
				</fieldset>
				<fieldset className='flex flex-col '>
					<Label htmlFor='initial-date'>Initial date</Label>
					<input
						className='w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:border-cyan-500'
						type='date'
						id='initial-date'
						name='initial-date'
					/>
				</fieldset>
				<fieldset className='flex flex-col gap-1'>
					<Label htmlFor='expiration-date'>Expiration date</Label>
					<input
						className='w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:border-cyan-500'
						type='date'
						id='expiration-date'
						name='expiration-date'
					/>
				</fieldset>
				<Button type='submit' aria-disabled={pending}>
					Save
				</Button>
			</form>
		</div>
	);
}
