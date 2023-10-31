'use client';

import { Button } from '@/app/components/Button';
import { Card } from '@/app/components/Card';
import { Cell } from '@/app/components/Cell';
import { Exercise } from '@/app/components/Exercise';
import { Input } from '@/app/components/Input';
import { IExercise, IExerciseSet } from '@/app/components/types';
import { useEffect, useState } from 'react';
// @ts-expect-error
import { experimental_useFormState as useFormState, experimental_useFormStatus as useFormStatus } from 'react-dom';

interface NewExerciseSet extends IExerciseSet {
	key: number;
	isNewRow: boolean;
}

interface RowProps {
	set: NewExerciseSet;
	onDelete: (key: number) => void;
	onUpdateWeight: (index: number, newValue: string) => void;
	onUpdateReps: (index: number, newValue: string) => void;
	isNewRow: boolean;
}

const Table = () => {
	const columns = [
		{ title: '' },
		{ title: 'set' },
		{
			title: 'kg',
			key: 'weight',
		},
		{
			title: 'reps',
			key: 'repetitions',
		},
	];

	const [keyCounter, setKeyCounter] = useState(1);

	const [sets, setSets] = useState<Array<NewExerciseSet>>([{ key: 0, order: 1, isNewRow: true }]);

	const addRow = () => {
		const key = keyCounter;
		setKeyCounter(prev => prev + 1);
		setSets(prevRows => {
			const rows = prevRows.map(r => ({ ...r, isNewRow: false }));
			return [...rows, { key, order: prevRows.length + 1, isNewRow: true }];
		});
	};

	const removeRow = (key: number) => {
		setSets(prevRows => {
			const rowsFiltered = prevRows.filter(row => row.key !== key);
			return rowsFiltered.map((r, index) => ({ ...r, order: index + 1, isNewRow: false }));
		});
	};

	const updateWeight = (index: number, newFieldValue: string) => {
		const weight = newFieldValue ? Number(newFieldValue) : undefined;
		setSets(prevRows => {
			const newRows = [...prevRows];
			newRows[index].weight = weight;
			return newRows;
		});
	};

	const updateReps = (index: number, newFieldValue: string) => {
		const repetitions = newFieldValue ? Number(newFieldValue) : undefined;
		setSets(prevRows => {
			const newRows = [...prevRows];
			newRows[index].repetitions = repetitions;
			return newRows;
		});
	};

	useEffect(() => {
		console.log(sets);
	}, [sets]);

	const [_, setCol, weightCol, repsCol] = columns;

	const Row = ({ set, onDelete, onUpdateReps, onUpdateWeight, isNewRow: isNewRowProp }: RowProps) => {
		const [shouldRender, setShouldRender] = useState(true);
		const [isNewRow, setIsNewRow] = useState(isNewRowProp);

		useEffect(() => {
			if (!shouldRender) {
				setTimeout(() => {
					onDelete(set.key);
				}, 200);
			}
		}, [shouldRender, onDelete, set.key]);

		useEffect(() => {
			if (isNewRow) {
				setTimeout(() => {
					setIsNewRow(false);
				}, 200); // Adjust the time according to your transition duration
			}
		}, [isNewRow]);

		return (
			<tr
				className={`flex flex-row gap-2 transition-transform duration-200 ${
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
					{sets.map((set, index) => (
						<Row
							key={set.key}
							set={set}
							onDelete={removeRow}
							onUpdateReps={updateReps}
							onUpdateWeight={updateWeight}
							isNewRow={set.isNewRow}></Row>
					))}
				</tbody>
			</table>
			<button
				type='button'
				onClick={() => addRow()}
				className='ease-in-out duration-300 w-[100%] text-center bg-slate-200 leading-6 px-4 py-0.5 hover:bg-cyan-700 hover:text-white text-cyan-600 font-bold rounded-lg focus:outline-none focus:ring focus:border-cyan-700'>
				+
			</button>
		</div>
	);
};

export const AddWorkout = () => {
	const [state, formAction] = useFormState((prevState: any, formData: FormData) => {}, { message: null });

	const { pending } = useFormStatus();

	return (
		<Card>
			<form action={formAction} className='flex flex-col gap-4'>
				<input
					type='text'
					name='exercise-title'
					className='text-lg text-center font-bold focus-visible:outline-none focus:placeholder-transparent placeholder-opacity-0'
					placeholder='Exercise title'></input>
				<Table />

				<Button type='submit' aria-disabled={pending}>
					Save
				</Button>
			</form>
		</Card>
	);
};
