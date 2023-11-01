'use client';

import { createWorkout } from '@/app/actions/addWorkout';
import { Button } from '@/app/components/Button';
import { Card } from '@/app/components/Card';
import { IExerciseSet } from '@/app/components/types';
import React, { useState } from 'react';

// @ts-expect-error
import { experimental_useFormState as useFormState, experimental_useFormStatus as useFormStatus } from 'react-dom';
import { Table } from './ExerciseTable';
import { useParams } from 'next/navigation';

interface NewExerciseSet extends IExerciseSet {
	key: number;
	isNewRow: boolean;
}

interface NewExercise {
	key: number;
}

export const AddWorkout = () => {
	const { routineId } = useParams();

	const [state, formAction] = useFormState(
		(prevState, formData) =>
			createWorkout(
				exercises.map(e => e.key),
				routineId,
				formData
			),
		{ message: null }
	);
	const [keyCounter, setKeyCounter] = useState(1);

	const { pending } = useFormStatus();

	const [exercises, setExercises] = useState<Array<NewExercise>>([{ key: 0 }]);

	const addExercise = () => {
		const key = keyCounter;
		setKeyCounter(prevKey => prevKey + 1);
		setExercises(prevExercises => [...prevExercises, { key }]);
	};

	return (
		<form action={formAction} className='flex flex-col gap-4'>
			{exercises.map(e => (
				<Card key={e.key}>
					<input
						type='text'
						name={`${e.key}.exercise-title`}
						className='text-lg text-center font-bold focus-visible:outline-none focus:placeholder-transparent placeholder-opacity-0'
						placeholder='Exercise title'></input>
					<Table exerciseKey={e.key} />
				</Card>
			))}

			<Button type='button' onClick={() => addExercise()}>
				Add Exercise
			</Button>

			<Button type='submit' aria-disabled={pending}>
				Save
			</Button>

			<b>{state.message}</b>
		</form>
	);
};
