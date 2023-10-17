import { Serie } from './Serie';

export const Exercise = ({ exercise }) => {
	const { id, title, muscle, type, sets, amountOfSets } = exercise;
	return (
		<div className='mb-4'>
			<div className='text-lg font-semibold'>{title}</div>
			<div className='flex flex-row gap-4'>
				{amountOfSets
					? Array.from({ length: amountOfSets }).map((_, index) => (
							<Serie key={index} reps={sets[0].repetitions}></Serie>
					  ))
					: exercise.sets.map(({ weight, repetitions }, index) => (
							<Serie key={index} weight={weight} reps={repetitions}></Serie>
					  ))}
			</div>
		</div>
	);
};
