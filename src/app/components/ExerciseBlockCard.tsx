import { Exercise } from './Exercise';

export const ExerciseBlockCard = ({ blockName, exercises }: { blockName: string; exercises: Array<any> }) => {
	console.log({ exercises, blockName });
	return (
		<div className='bg-white rounded-lg p-4 shadow-md mb-4'>
			<h3 className='text-xl font-semibold mb-4'>{blockName}</h3>
			{exercises.map((exercise, index) => (
				<Exercise key={index} exercise={exercise}></Exercise>
			))}
		</div>
	);
};
