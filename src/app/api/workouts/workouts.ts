import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export async function fetchWorkout({ routineId, dayOfWeek }: { routineId: string; dayOfWeek: number }): Promise<any> {
	try {
		const client = await clientPromise;
		const db = client.db('woddy');

		const workout = await db
			.collection('workouts')
			.findOne({ dayOfWeek: dayOfWeek, routineId: new ObjectId(routineId) });

		if (workout) {
			// map ObjectId so it can be sent from server to client component.
			const { _id, blocks, ...rest } = workout;
			const mappedBlocks = Object.keys(blocks).map(blockKey => {
				const block = blocks[blockKey];
				return block.map((e: any) => ({ ...e, id: e.id?.toString() }));
			});

			return { ...rest, id: _id.toString(), blocks: mappedBlocks };
		}
		return null;
	} catch (e) {
		console.error(e);
	}
}

export async function editWorkout({ routineId, workoutId, workout, previous }: any) {
	console.log(
		'insert workout',
		{ routineId },
		{ workout: JSON.stringify(workout) },
		{ previous: JSON.stringify(previous) }
	);

	// Define a filter (to find the document to update)
	const filter = { routineId: new ObjectId(routineId) };
	const editedAt = new Date();

	// Define the update operation (e.g., setting a new value for a field)
	const updateDoc = {
		$set: {
			blocks: workout.blocks,
			editedAt,
		},
	};

	const workoutHistory = { ...previous, editedAt };

	try {
		const client = await clientPromise;
		const db = client.db('woddy');

		const result = await db.collection('workouts').updateOne(filter, updateDoc);
		const historyResult = await db.collection('workouts_history').insertOne(workoutHistory);
		console.log({ result });
		console.log({ historyResult });
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
