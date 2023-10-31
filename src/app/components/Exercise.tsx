'use client';
import { useState } from 'react';
import { IExercise, IExerciseSet } from './types';
import { Cell } from './Cell';
import { Input } from './Input';

export const Exercise = ({ exercise }: { exercise: IExercise }) => {
	const columns = [
		{ title: 'set', value: (row: IExerciseSet) => row.order },
		{ title: 'prev', value: (row: IExerciseSet) => row.previous || ' - ' },
		{
			title: 'kg',
			key: 'weight',
			value: (row: IExerciseSet) => row.weight,
			onChange: (prevRowValue: IExerciseSet, newFieldValue: string) => ({
				...prevRowValue,
				weight: newFieldValue ? Number(newFieldValue) : undefined,
			}),
		},
		{
			title: 'reps',
			key: 'repetitions',
			value: (row: IExerciseSet) => row.repetitions,
			onChange: (prevRowValue: IExerciseSet, newFieldValue: string) => ({
				...prevRowValue,
				repetitions: newFieldValue ? Number(newFieldValue) : undefined,
			}),
		},
	];

	const { title, sets: exSets } = exercise;

	const [sets, setSets] = useState<Array<IExerciseSet>>(exSets);

	const onChangeCell =
		(index: number, buildNewSet?: (prevRowValue: IExerciseSet, newFieldValue: string) => IExerciseSet) =>
		(e: React.ChangeEvent<HTMLInputElement>) =>
			setSets(prevSets =>
				prevSets.map((s, i) => {
					return i === index && buildNewSet ? buildNewSet(s, e.target.value) : s;
				})
			);

	return (
		<div className='mb-4'>
			<div className='text-lg text-center font-bold'>{title}</div>
			<table className='w-[100%]'>
				<thead>
					<tr className='flex flex-row '>
						{columns.map(col => (
							<th className='w-1/4 text-center font-semibold capitalize' key={col.title}>
								{col.title}
							</th>
						))}
					</tr>
				</thead>
				<tbody className='flex flex-col gap-2'>
					{sets.map((set: any, index: number) => {
						const [setCol, prevCol, weightCol, repsCol] = columns;
						return (
							<tr key={index} className='flex flex-row gap-2'>
								<Cell>
									<Input disabled>{setCol.value(set)}</Input>
								</Cell>
								<Cell>
									<Input disabled>{prevCol.value(set)}</Input>
								</Cell>
								<Cell>
									<Input
										name={`${exercise.id.toLowerCase()}.${weightCol.key}`}
										value={weightCol.value(set)}
										onChange={onChangeCell(index, weightCol.onChange)}></Input>
								</Cell>
								<Cell>
									<Input
										name={`${exercise.id.toLowerCase()}.${repsCol.key}`}
										value={repsCol.value(set)}
										onChange={onChangeCell(index, repsCol.onChange)}></Input>
								</Cell>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};
