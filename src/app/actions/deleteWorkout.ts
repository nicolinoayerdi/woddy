'use server';

import { revalidatePath } from 'next/cache';
import { deleteWorkout as apiDeleteWorkout } from '../api/workouts/workouts';

export async function deleteWorkout({ workoutId }: { workoutId: string }) {
	try {
		const deleted = await apiDeleteWorkout({ workoutId });
		revalidatePath('/routines/[routineId]');
		console.log({ deleted });
		return { message: 'Workout created ', deleted };
	} catch (e) {
		return { message: 'Failed to create workout' };
	}
}
