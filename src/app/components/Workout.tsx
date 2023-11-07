'use client';

import { updateWorkout } from '../actions/insertWorkout';
import { Button } from './Button';
import { Card } from './Card';
import { Exercise } from './Exercise';
// @ts-expect-error
import { experimental_useFormState as useFormState, experimental_useFormStatus as useFormStatus } from 'react-dom';
import { Input } from './Input';

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
				<Card className='flex flex-col items-center'>
					<div className='text-lg text-center font-bold mb-4'>Duración en minutos</div>
					<Input
						name='duration'
						className='w-[20%] h-14'
						inputmode='numeric'
						min={0}
						placeholder='Duración'></Input>
				</Card>
				{state.message && <div>{state.message}</div>}
				<Button className='w-[100%]' type='submit' aria-disabled={pending}>
					Save
				</Button>
			</form>
		</div>
	);
};
