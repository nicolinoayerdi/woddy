'use client';
import { useState } from 'react';
import { IExercise, IExerciseSet } from './types';

const Cell = ({ children }: any) => <td className='text-center w-1/4 md:leading-6'>{children}</td>;

const Input = ({ children, name, value, onChange, disabled }: any) =>
	disabled ? (
		<div className='remove-arrow w-14 text-center bg-slate-200 leading-6 font-normal rounded-lg px-4 py-0.5'>
			{children}
		</div>
	) : (
		<input
			className='remove-arrow w-14 text-center bg-slate-200 leading-6 font-normal rounded-lg px-4 py-0.5'
			type='number'
			id={name}
			name={name}
			value={value}
			onChange={onChange}
		/>
	);

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

	const { title, sets: exSets, amountOfSets } = exercise;

	const initialSets: Array<IExerciseSet> = amountOfSets
		? Array.from({ length: amountOfSets }).map((_, index) => ({
				repetitions: exSets[0].repetitions,
				order: index + 1,
		  }))
		: exSets;

	const [sets, setSets] = useState(initialSets);

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
				<tbody>
					<div className='flex flex-col gap-2'>
						{sets.map((set: IExerciseSet, index: number) => {
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
					</div>
				</tbody>
			</table>
		</div>
	);
};
