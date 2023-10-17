/**
 * const groupedExercises = exercises.reduce((result, exercise) => {
		const { block } = exercise;
		(result[block] || (result[block] = [])).push(exercise);
		return result;
	}, {});
 */

import { ExerciseBlockCard } from './ExerciseBlockCard';

interface GroupedExercises {
	[blockNumber: string]: any[];
}

export interface WodProps {
	dayOfWeek: String;
	exercises: GroupedExercises;
}

export const Wod = ({ dayOfWeek, exercises }: WodProps) => {
	return (
		<>
			{Object.keys(exercises).map(blockNumber => (
				<ExerciseBlockCard
					key={blockNumber}
					blockNumber={blockNumber}
					exercises={exercises[blockNumber]}></ExerciseBlockCard>
			))}
		</>
	);
};
