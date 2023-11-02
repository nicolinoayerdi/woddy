import { WorkoutDto } from '@/app/types';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';
import { isValidObjectId } from '../utils';

interface RoutineBase {
	title: String;
	initialDate: Date;
	validUntil: Date;
	workouts?: Array<WorkoutDto>;
}

interface RoutineDocument extends RoutineBase {
	_id: ObjectId;
}

interface RoutineDto extends RoutineBase {
	id: String;
}

export async function createRoutine({ routine }: any) {
	try {
		const client = await clientPromise;
		const db = client.db('woddy');

		const result = await db.collection('routines').insertOne(routine);
		return result;
	} catch (e) {
		console.error(e);
	}
}

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

export async function fetchRoutine(routineId: string): Promise<RoutineDto | undefined> {
	if (!isValidObjectId(routineId)) return undefined;

	const objectId = new ObjectId(routineId);

	try {
		const client = await clientPromise;
		const db = client.db('woddy');

		const workouts = (await db.collection('workouts').find({ routineId: objectId }).toArray()).map(
			({ _id, dayOfWeek, exercises, editedAt, routineId }) => ({
				id: (_id as ObjectId).toString(),
				dayOfWeek,
				exercises,
				editedAt,
				routineId: (routineId as ObjectId).toString(),
			})
		);

		const { _id, ...rest } = (await db.collection('routines').findOne({ _id: objectId })) as RoutineDocument;

		const routine = { id: _id.toString(), ...rest };

		return { ...routine, workouts };
	} catch (e) {
		console.error(e);
	}
}

export async function deleteRoutine({ routineId }: { routineId: string }) {
	try {
		const client = await clientPromise;
		const db = client.db('woddy');

		const result = await db.collection('routines').deleteOne({ _id: new ObjectId(routineId) });
		console.log({ result });
		return result;
	} catch (e) {
		console.error(e);
	}
}
