'use client';

import { IExerciseSet } from '@/app/components/types';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';

// @ts-expect-error
import { experimental_useFormState as useFormState, experimental_useFormStatus as useFormStatus } from 'react-dom';
import { Row } from './Row';

interface NewExerciseSet extends IExerciseSet {
	key: number;
	isNewRow: boolean;
}

interface NewExercise {
	key: number;
}

export const Table = ({ exerciseKey }) => {
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
