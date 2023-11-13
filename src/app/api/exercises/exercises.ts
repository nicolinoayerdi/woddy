import { fetchWorkout, getAllWorkouts } from '../workouts/workouts';

export async function getExercises({ routineId, workoutId }: { routineId: string; workoutId: string }) {
	const { exercises } = await fetchWorkout({ routineId, workoutId });

	const flattened = exercises.map(({ title }: { title: string }) => title);

	const withoutRepeated = Array.from(new Set(flattened));
	return withoutRepeated;
}
