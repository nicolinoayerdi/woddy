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

export async function editWorkout({ routineId, workoutId, newBlocks }: any) {
	console.log('insert workout', { routineId }, { newBlocks });

	// Define a filter (to find the document to update)
	const filter = { routineId: new ObjectId(routineId) };

	// Define the update operation (e.g., setting a new value for a field)
	const updateDoc = {
		$set: {
			blocks: newBlocks,
		},
	};

	try {
		const client = await clientPromise;
		const db = client.db('woddy');

		const result = await db.collection('workouts').updateOne(filter, updateDoc);
		console.log({ result });
		return result;
	} catch (e) {
		console.error(e);
	}
}
