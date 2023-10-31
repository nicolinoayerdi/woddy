'use client';

import { updateWorkout } from '../actions/insertWorkout';
import { Button } from './Button';
import { Card } from './Card';
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
					<Card key={exercise.id}>
						<Exercise exercise={exercise}></Exercise>
					</Card>
				))}
				<div>{state.message}</div>
				<Button className='w-[100%]' type='submit' aria-disabled={pending}>
					Save
				</Button>
			</form>
		</div>
	);
};
