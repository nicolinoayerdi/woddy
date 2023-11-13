'use client';

import { updateWorkout } from '../../../../actions/insertWorkout';
import { Button } from '../../../../components/Button';
import { Card } from '../../../../components/Card';
import { Exercise } from './Exercise';
// @ts-expect-error
import { experimental_useFormState as useFormState, experimental_useFormStatus as useFormStatus } from 'react-dom';
import { Input } from '../../../../components/Input';

export interface WodProps {
	exercises: Array<any>;
	routineId: string;
	workoutId: string;
}

export const Workout = ({ routineId, workoutId, exercises }: WodProps) => {
	const [state, formAction] = useFormState(
		(prevState: any, formData: FormData) => updateWorkout(routineId, workoutId, formData),
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
						inputMode='numeric'
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
