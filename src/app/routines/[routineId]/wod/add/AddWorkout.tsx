'use client';

import { createWorkout } from '@/app/actions/addWorkout';
import { Button } from '@/app/components/Button';
import { Card } from '@/app/components/Card';
import { Cell } from '@/app/components/Cell';
import { Exercise } from '@/app/components/Exercise';
import { Input } from '@/app/components/Input';
import { IExercise, IExerciseSet } from '@/app/components/types';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';

// @ts-expect-error
import { experimental_useFormState as useFormState, experimental_useFormStatus as useFormStatus } from 'react-dom';

interface RowProps {
	set: NewExerciseSet;
	onDelete: (key: number) => void;
	onUpdateWeight: (key: number, newValue: string) => void;
	onUpdateReps: (key: number, newValue: string) => void;
	isNewRow: boolean;
	columns: Array<any>;
}

interface NewExerciseSet extends IExerciseSet {
	key: number;
	isNewRow: boolean;
}

interface NewExercise {
	key: number;
}

const Row = ({ set, onDelete, onUpdateReps, onUpdateWeight, isNewRow: isNewRowProp, columns }: RowProps) => {
	const [shouldRender, setShouldRender] = useState(true);
	const [isNewRow, setIsNewRow] = useState(isNewRowProp);

	const [_, setCol, weightCol, repsCol] = columns;

	useEffect(() => {
		if (!shouldRender) {
			setTimeout(() => {
				onDelete(set.key);
			}, 100);
		}
	}, [shouldRender, onDelete, set.key]);

	useEffect(() => {
		if (isNewRow) {
			setTimeout(() => {
				setIsNewRow(false);
			}, 100); // Adjust the time according to your transition duration
		}
	}, [isNewRow]);

	return (
		<tr
			className={`flex flex-row gap-2 transition-transform duration-100 ${
				shouldRender ? '' : 'transform scale-50'
			}  ${isNewRow ? 'transform scale-50' : ''}`}>
			<Cell className='w-1/4'>
				<button
					type='button'
					className='w-14 h-[100%] hover:bg-cyan-700 hover:text-white text-cyan-600 font-bold rounded-lg focus:outline-none focus:ring focus:border-cyan-700'
					onClick={() => setShouldRender(false)}>
					-
				</button>
			</Cell>
			<Cell className='w-1/4'>
				<Input className='w-14' name={setCol.key} value={set.order} disabled />
			</Cell>
			<Cell className='w-1/4'>
				<Input
					className='w-14'
					name={weightCol.key}
					value={set.weight}
					onChange={(e: any) => onUpdateWeight(set.key, e.target.value)}
				/>
			</Cell>
			<Cell className='w-1/4'>
				<Input
					className='w-14'
					name={repsCol.key}
					value={set.repetitions}
					onChange={(e: any) => onUpdateReps(set.key, e.target.value)}
				/>
			</Cell>
		</tr>
	);
};

const Table = ({ exerciseKey }) => {
	const columns = [
		{ title: '' },
		{ title: 'set', key: `${exerciseKey}.order` },
		{
			title: 'kg',
			key: `${exerciseKey}.weight`,
		},
		{
			title: 'reps',
			key: `${exerciseKey}.repetitions`,
		},
	];

	const [keyCounter, setKeyCounter] = useState(1);

	const [sets, setSets] = useState<Array<NewExerciseSet>>([{ key: 0, order: 1, isNewRow: false }]);

	const addRow = () => {
		const key = keyCounter;
		setKeyCounter(prev => prev + 1);
		setSets(prevRows => {
			return [...prevRows, { key, order: prevRows.length + 1, isNewRow: true }];
		});
	};

	const removeRow = useCallback(
		(key: number) => {
			setSets(prevRows => {
				const rowsFiltered = prevRows.filter(row => row.key !== key);
				return rowsFiltered.map((r, index) => ({ ...r, order: index + 1, isNewRow: false }));
			});
		},
		[setSets]
	);

	const updateWeight = useCallback(
		(key: number, newFieldValue: string) => {
			const weight = newFieldValue ? Number(newFieldValue) : undefined;
			setSets(prevRows => {
				return prevRows.map(r => (r.key === key ? { ...r, weight } : r));
			});
		},
		[setSets]
	);

	const updateReps = useCallback(
		(key: number, newFieldValue: string) => {
			const repetitions = newFieldValue ? Number(newFieldValue) : undefined;
			setSets(prevRows => {
				return prevRows.map(r => (r.key === key ? { ...r, repetitions } : r));
			});
		},
		[setSets]
	);

	useEffect(() => {
		console.log(sets);
	}, [sets]);

	const [_, setCol, weightCol, repsCol] = columns;

	return (
		<div className='flex flex-col gap-2'>
			<table className='w-[100%]'>
				<thead>
					<tr className='flex flex-row gap-2'>
						{columns.map(col => (
							<th className='w-1/4 text-center font-semibold capitalize border-solid' key={col.title}>
								{col.title}
							</th>
						))}
					</tr>
				</thead>
				<tbody className='flex flex-col gap-2'>
					{sets.map(set => (
						<Row
							key={set.key}
							set={set}
							onDelete={removeRow}
							onUpdateReps={updateReps}
							onUpdateWeight={updateWeight}
							isNewRow={set.isNewRow}
							columns={columns}></Row>
					))}
				</tbody>
			</table>
			<button
				type='button'
				onClick={() => addRow()}
				className='ease-in-out duration-300 w-[100%] text-center bg-slate-200 leading-6 px-4 py-0.5 hover:bg-cyan-700 hover:text-white text-cyan-600 font-bold rounded-lg focus:outline-none focus:ring focus:border-cyan-700'>
				Add set
			</button>
		</div>
	);
};

export const AddWorkout = () => {
	const [state, formAction] = useFormState(createWorkout, { message: null });
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
		</form>
	);
};
