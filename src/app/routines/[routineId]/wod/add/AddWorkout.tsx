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
import { DayOfWeek } from '@/app/types';
import dayjs from 'dayjs';
import Link from 'next/link';

interface NewExerciseSet extends IExerciseSet {
	key: number;
	isNewRow: boolean;
}

export interface NewExercise {
	key: number;
}

export const AddWorkout = () => {
	const { routineId }: { routineId: string } = useParams();

	const [keyCounter, setKeyCounter] = useState(1);

	const [state, formAction] = useFormState(
		(prevState: any, formData: FormData) =>
			createWorkout(
				exercises.map(e => e.key),
				routineId,
				formData
			),
		{ message: null }
	);

	const { pending } = useFormStatus();

	const daysOfWeek: Array<DayOfWeek> = [1, 2, 3, 4, 5, 6, 7];

	const [exercises, setExercises] = useState<Array<NewExercise>>([{ key: 0 }]);

	const addExercise = () => {
		const key = keyCounter;
		setKeyCounter(prevKey => prevKey + 1);
		setExercises(prevExercises => [...prevExercises, { key }]);
	};

	return (
		<form action={formAction} className='flex flex-col gap-4'>
			{state.created && (
				<div className='flex flex-col gap-2 text-center bg-green-500 text-white rounded-md py-2'>
					<b>{state.message}</b>
					<Link className='underline' href={`/routines/${state.routineId}/wod/${state.dayOfWeek}`}>
						Click here to go to workout
					</Link>
				</div>
			)}

			<Card className='flex justify-center'>
				<select className='w-[100%] h-[100%]' name='day-of-week'>
					{daysOfWeek.map(d => (
						<option key={d} value={d}>
							{dayjs().day(d).format('dddd')}
						</option>
					))}
				</select>
			</Card>

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
		</form>
	);
};
