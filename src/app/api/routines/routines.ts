import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export async function fetchRoutines() {
	try {
		const client = await clientPromise;
		const db = client.db('woddy');

		const routines = await db.collection('routines').find({}).sort({ validUntil: -1 }).limit(10).toArray();
		return routines;
	} catch (e) {
		console.error(e);
	}
}

export async function fetchCurrentRoutine() {
	const today = new Date().toISOString();
	try {
		const client = await clientPromise;
		const db = client.db('woddy');

		const routines = await db
			.collection('routines')
			.findOne({ $and: [{ initialDate: { $lte: today } }, { validUntil: { $gte: today } }] });
		return routines;
	} catch (e) {
		console.error(e);
	}
}

export async function fetchRoutine(routineId: string) {
	const objectId = new ObjectId(routineId);

	try {
		const client = await clientPromise;
		const db = client.db('woddy');

		const routine = await db.collection('routines').findOne({ _id: objectId });
		return routine;
	} catch (e) {
		console.error(e);
	}
}
