import { revalidatePath } from 'next/cache';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export async function fetchWorkout({ routineId, workoutId }: { routineId: string; workoutId: string }): Promise<any> {
	try {
		console.log('fetch workout', routineId, workoutId);
		const client = await clientPromise;
		const db = client.db('woddy');

		const workout = await db.collection('workouts').findOne({ _id: new ObjectId(workoutId) });

		const [lastLog] = await db
			.collection('workouts_history')
			.find({ workoutId: workout?._id.toString() })
			.sort({ editedAt: -1 })
			.limit(1)
			.toArray();

		if (workout) {
			// map ObjectId so it can be sent from server to client component.
			const { _id, exercises, ...rest } = workout;

			const getPrevious = (exerciseIndex: number, setIndex: number) =>
				lastLog ? lastLog.exercises[exerciseIndex]?.sets[setIndex]?.weight : 0;

			const mappedExercises = exercises.map((e: any, exerciseIndex: number) => {
				const mappedSets = e.sets.map(
					(s: { order: number; weight: number; repetitions: number }, setIndex: number) => ({
						...s,
						previous: getPrevious(exerciseIndex, setIndex),
					})
				);

				return { ...e, id: e.id?.toString(), sets: mappedSets };
			});

			return { ...rest, id: _id.toString(), exercises: mappedExercises };
		}
		return null;
	} catch (e) {
		console.error(e);
	}
}

export async function editWorkout({ routineId, workoutId, workout, previous }: any) {
	// Define a filter (to find the document to update)
	const filter = { routineId: new ObjectId(routineId) };
	const editedAt = new Date();

	// Define the update operation (e.g., setting a new value for a field)
	const updateDoc = {
		$set: {
			exercises: workout.exercises,
			duration: workout.duration,
			editedAt,
		},
	};

	const workoutHistory = { ...previous, editedAt };

	try {
		const client = await clientPromise;
		const db = client.db('woddy');

		const result = await db.collection('workouts').updateOne(filter, updateDoc);
		const historyResult = await db.collection('workouts_history').insertOne(workoutHistory);

		revalidatePath('/');

		return result;
	} catch (e) {
		console.error(e);
	}
}

export async function fetchWorkoutHistory({ workoutId }: { workoutId: string }) {
	try {
		const client = await clientPromise;
		const db = client.db('woddy');

		const history = await db
			.collection('workout_history')
			.find({ workoutId: new ObjectId(workoutId) })
			.sort({ editedAt: -1 })
			.limit(10)
			.toArray();
		return history;
	} catch (e) {
		console.error(e);
	}
}

export async function createWorkout({ workout }: any) {
	const newWorkout = {
		...workout,
		routineId: new ObjectId(workout.routineId),
		editedAt: new Date(),
	};
	try {
		const client = await clientPromise;
		const db = client.db('woddy');

		const result = await db.collection('workouts').insertOne(newWorkout);
		return result;
	} catch (e) {
		console.error(e);
	}
}

export async function deleteWorkout({ workoutId }: { workoutId: string }) {
	try {
		const client = await clientPromise;
		const db = client.db('woddy');

		const result = await db.collection('workouts').deleteOne({ _id: new ObjectId(workoutId) });
		console.log({ result });
		return result;
	} catch (e) {
		console.error(e);
	}
}
