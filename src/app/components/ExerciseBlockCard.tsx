import { Exercise } from './Exercise';

export const ExerciseBlockCard = ({ blockName, exercises }: { blockName: string; exercises: Array<any> }) => {
	return (
		<div className='bg-white rounded-lg p-4 shadow-md mb-4'>
			<h3 className='text-xl font-semibold mb-4'>{blockName}</h3>
			{exercises.map(exercise => (
				<Exercise key={exercise.id} exercise={exercise}></Exercise>
			))}
		</div>
	);
};
