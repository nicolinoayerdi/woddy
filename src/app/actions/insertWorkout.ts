'use server';

import { revalidatePath } from 'next/cache';
import { editWorkout, fetchWorkout } from '../api/workouts/workouts';
import { ObjectId } from 'mongodb';
import { RedirectType, redirect } from 'next/navigation';

interface SetDto {
	order: string;
	repetitions: number;
	weight?: number;
}

interface ExerciseDto {
	id: ObjectId;
	title: string;
	sets: Array<SetDto>;
}

interface WorkoutDto {
	id: string;
	dayOfWeek: number;
	routineId: string;
	exercises: Array<ExerciseDto>;
}

export async function updateWorkout(routineId: string, workoutId: number, formData: FormData) {
	let w: WorkoutDto | null | undefined = await fetchWorkout({ routineId, dayOfWeek: workoutId });

	if (w) {
		const previous = { exercises: w.exercises, workoutId: w.id };

		console.log({ routineId, workoutId, w });

		const exercises = w.exercises.map((e: ExerciseDto) => {
			const weight = formData.getAll(`${e.title.toString().toLowerCase()}.weight`);
			const reps = formData.getAll(`${e.title.toString().toLowerCase()}.repetitions`);
			const newSets: Array<SetDto> = e.sets.map((set: SetDto, index) => ({
				...set,
				weight: Number(weight[index]),
				repetitions: Number(reps[index]),
			}));

			return { ...e, sets: newSets };
		});

		await editWorkout({ routineId, workoutId, workout: { exercises }, previous });
		revalidatePath('/');
		redirect(`${w.dayOfWeek}/success`, RedirectType.push);
		return { message: 'updated workout ' };
	}

	return { message: 'workout does not exists' };
}
