'use server';

import { revalidatePath } from 'next/cache';
import { editWorkout, fetchWorkout } from '../api/workouts/workouts';
import { ObjectId } from 'mongodb';

interface SetDto {
	order: string;
	repetitions: number;
	weight?: number;
}

interface ExerciseDto {
	id: ObjectId;
	title: string;
	amountOfSets?: number;
	sets: Array<SetDto>;
}

interface WorkoutDto {
	id: string;
	dayOfWeek: number;
	routineId: string;
	blocks: {
		[blockName: string]: Array<ExerciseDto>;
	};
}

export async function updateWorkout(routineId: string, workoutId: number, formData: FormData) {
	let w: WorkoutDto | null | undefined = await fetchWorkout({ routineId, dayOfWeek: workoutId });

	if (w) {
		const blocks = Object.assign({}, w.blocks); // deep copy
		const previous = { blocks, workoutId: w.id };

		Object.keys(w.blocks).forEach(b => {
			const exercises = w?.blocks[b];
			exercises?.forEach(e => {
				const weight = formData.getAll(`${e.id.toString()}.weight`);
				const reps = formData.getAll(`${e.id.toString()}.repetitions`);
				if (!e.amountOfSets) {
					e.sets.forEach((set, index) => {
						set.weight = Number(weight[index]);
						set.repetitions = Number(reps[index]);
					});
				}
			});
		});

		console.log(JSON.stringify(w));
		try {
			await editWorkout({ routineId, workoutId, workout: w, previous });
			revalidatePath('/');
			return { message: 'updated workout ' };
		} catch (e) {
			return { message: 'failed to update workout' };
		}
	}

	/* if (w) {
		const { blocks } = w;
		console.log({ w });

		const blockToEdit = blocks[blockKey];

		const newW = { ...blocks, [blockKey]: [{ ...blockToEdit, sets: newSets } ]};

		
	} */
	return { message: 'failed to update workout' };
}
