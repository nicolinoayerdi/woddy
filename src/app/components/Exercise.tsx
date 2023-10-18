interface ExerciseSet {
	setNumber: number;
	previous?: number;
	weight?: number;
	repetitions?: number;
}

export const Exercise = ({ exercise }) => {
	const columns = [
		{ title: 'Set', value: (row: ExerciseSet) => row.setNumber },
		{ title: 'Previous', value: (row: ExerciseSet) => row.previous || ' - ' },
		{ title: 'Kg', value: (row: ExerciseSet) => row.weight || ' - ' },
		{ title: 'Reps', value: (row: ExerciseSet) => row.repetitions },
	];

	const { id, title, muscle, type, sets: exSets, amountOfSets } = exercise;

	const sets: Array<ExerciseSet> = (
		amountOfSets ? Array.from({ length: amountOfSets }).map(_ => ({ repetitions: exSets[0].repetitions })) : exSets
	).map((set: ExerciseSet, index: number) => ({ ...set, setNumber: index + 1 }));

	return (
		<div className='mb-4'>
			<div className='text-lg text-center font-bold'>{title}</div>

			<table className='w-[100%]'>
				<thead>
					<tr className='flex flex-row'>
						{columns.map(col => (
							<th className='w-1/4 text-center font-semibold' key={col.title}>
								{col.title}
							</th>
						))}
					</tr>
				</thead>
				<tbody className='flex flex-col gap-2'>
					{sets.map((set: ExerciseSet, index: number) => (
						<tr key={index} className='flex flex-row'>
							{columns.map(col => (
								<td className='text-center w-1/4 md:leading-6' key={`${index}-${col.title}`}>
									{col.value(set) && (
										<input
											className='w-14 text-center bg-slate-200 leading-6 font-normal rounded-lg px-4 py-0.5'
											value={col.value(set)}
										/>
									)}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
