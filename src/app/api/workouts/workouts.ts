import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export async function fetchWorkout({ routineId, dayOfWeek }: { routineId: string; dayOfWeek: number }) {
	try {
		const client = await clientPromise;
		const db = client.db('woddy');

		const workout = await db
			.collection('workouts')
			.findOne({ dayOfWeek: dayOfWeek, routineId: new ObjectId(routineId) });
		return workout;
	} catch (e) {
		console.error(e);
	}
}
