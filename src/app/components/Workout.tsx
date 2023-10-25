'use client';

import { updateWorkout } from '../actions/insertWorkout';
import { Exercise } from './Exercise';
// @ts-expect-error
import { experimental_useFormState as useFormState, experimental_useFormStatus as useFormStatus } from 'react-dom';

export interface WodProps {
	exercises: Array<any>;
	routineId: string;
	dayOfWeek: number;
}

export const Wod = ({ routineId, dayOfWeek, exercises }: WodProps) => {
	const [state, formAction] = useFormState(
		(prevState: any, formData: FormData) => updateWorkout(routineId, dayOfWeek, formData),
		{ message: null }
	);

	const { pending } = useFormStatus();

	return (
		<div className='py-4'>
			<form action={formAction}>
				{exercises.map((exercise: any) => (
					<div key={exercise.id} className='bg-white rounded-lg p-4 shadow-md mb-4'>
						<Exercise exercise={exercise}></Exercise>
					</div>
				))}
				<div>{state.message}</div>
				<button className='bg-cyan-500 text-white rounded-md w-[100%]' type='submit' aria-disabled={pending}>
					Submit
				</button>
			</form>
		</div>
	);
};
