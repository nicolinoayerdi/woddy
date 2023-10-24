'use client';

import { updateWorkout } from '../actions/insertWorkout';
import { Exercise } from './Exercise';
// @ts-expect-error
import { experimental_useFormState as useFormState, experimental_useFormStatus as useFormStatus } from 'react-dom';

interface Blocks {
	[blockName: string]: any[];
}

export interface WodProps {
	blocks: Blocks;
	routineId: string;
	dayOfWeek: number;
}

const ExerciseBlockCard = ({ blockName, exercises }: { blockName: string; exercises: Array<any> }) => {
	return (
		<div className='bg-white rounded-lg p-4 shadow-md mb-4'>
			<h3 className='text-xl font-semibold mb-4'>{blockName}</h3>
			{exercises.map((exercise, index) => (
				<Exercise key={index} exercise={exercise}></Exercise>
			))}
		</div>
	);
};

export const Wod = ({ routineId, dayOfWeek, blocks }: WodProps) => {
	const [state, formAction] = useFormState(
		(prevState: any, formData: FormData) => updateWorkout(routineId, dayOfWeek, formData),
		{ message: null }
	);

	const { pending } = useFormStatus();

	return (
		<div className='py-4'>
			<form action={formAction}>
				{Object.keys(blocks).map((blockName: string) => (
					<ExerciseBlockCard
						key={blockName}
						blockName={blockName}
						exercises={blocks[blockName]}></ExerciseBlockCard>
				))}
				<div>{state.message}</div>
				<button className='bg-cyan-500 text-white rounded-md w-[100%]' type='submit' aria-disabled={pending}>
					Submit
				</button>
			</form>
		</div>
	);
};
