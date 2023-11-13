import { getAllWorkouts } from '../workouts/workouts';

export async function getExercises() {
	const workouts = await getAllWorkouts();

	const flattened = workouts
		.reduce(
			(previousValue: any, { exercises }: any) => [
				...previousValue,
				...exercises.map((e: any) => ({ title: e.title })),
			],
			[]
		)
		.map(e => e.title);

	const withoutRepeated = Array.from(new Set(flattened));
	return withoutRepeated;
	return ['empujes'];
}
