'use server';

import { revalidatePath } from 'next/cache';
import { ObjectId } from 'mongodb';
import { createWorkout as apiCreateWorkout } from '../api/workouts/workouts';
import dayjs from 'dayjs';

export async function createWorkout(exerciseKeys: Array<number>, routineId, formData: FormData) {
	const exercises = exerciseKeys.map(key => {
		const weights = formData.getAll(`${key}.weight`);
		const reps = formData.getAll(`${key}.repetitions`);
		const title = formData.get(`${key}.exercise-title`);
		const sets = weights.map((w, index) => ({
			order: index + 1,
			weight: Number(w),
			repetitions: Number(reps[index]),
		}));

		const exercise = {
			title,
			sets,
		};

		return exercise;
	});

	const workout = {
		dayOfWeek: 1, // replace with a day of week select
		routineId,
		exercises,
	};

	try {
		const workoutCreated = await apiCreateWorkout({ workout });
		revalidatePath('/');
		return { message: 'Workout created ', routineId: workoutCreated?.insertedId };
	} catch (e) {
		return { message: 'Failed to create workout' };
	}
}
