'use client';

import { Cell } from '@/app/components/Cell';

import { Input } from '@/app/components/Input';
import { IExerciseSet } from '@/app/components/types';
import React, { useEffect, useState } from 'react';

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

export const Row = ({ set, onDelete, onUpdateReps, onUpdateWeight, isNewRow: isNewRowProp, columns }: RowProps) => {
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
