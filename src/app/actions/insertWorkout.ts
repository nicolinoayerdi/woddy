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

export async function updateWorkout(
	routineId: string,
	workoutId: number,
	blockKey: string,
	prevState: any,
	formData: FormData
) {
	let w: WorkoutDto | null | undefined = await fetchWorkout({ routineId, dayOfWeek: workoutId });

	if (w) {
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

		console.log({ newW: JSON.stringify(w.blocks) });
	}

	/* formData.forEach((value, key) => {
		const [exerciseId, attribute] = key.split('.');
		console.log(exerciseId, attribute, value);
	}); */

	// Now, structuredData contains the structured form data
	//console.log(structuredData);

	//console.log({ newWeights, newReps });

	//const newSets = newWeights.map((w, index) => ({ order: index + 1, weight: w, repetitions: newReps[index] }));

	/* if (w) {
		const { blocks } = w;
		console.log({ w });

		const blockToEdit = blocks[blockKey];

		const newW = { ...blocks, [blockKey]: [{ ...blockToEdit, sets: newSets } ]};

		try {
			await editWorkout({ routineId, workoutId, newBlocks: newW });
			revalidatePath('/');
			return { message: 'updated workout ' };
		} catch (e) {
			return { message: 'failed to update workout' };
		}
	} */
	return { message: 'failed to update workout' };
}
