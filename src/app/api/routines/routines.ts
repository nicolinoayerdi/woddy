import { WorkoutDto } from '@/app/types';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';
import { isValidObjectId } from '../utils';
import { auth } from '../auth/auth';
import { Session } from 'next-auth';

interface RoutineBase {
	title: String;
	user?: String;
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
	const session: Session | null = await auth();

	if (!session?.user?.email) {
		throw new Error('unauthorized');
	}

	try {
		const client = await clientPromise;
		const db = client.db('woddy');

		const routines = await db
			.collection('routines')
			.find({ user: session.user.email })
			.sort({ validUntil: -1 })
			.toArray();
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
	const session: Session | null = await auth();

	if (!session?.user?.email) {
		throw new Error('unauthorized');
	}

	if (!isValidObjectId(routineId)) return undefined;

	const objectId = new ObjectId(routineId);

	try {
		const client = await clientPromise;
		const db = client.db('woddy');

		const { _id, user, ...rest } = (await db.collection('routines').findOne({ _id: objectId })) as RoutineDocument;

		if (user !== session.user?.email) throw new Error('routine does not belong to user');

		const workouts = (await db.collection('workouts').find({ routineId: objectId }).toArray()).map(
			({ _id, dayOfWeek, exercises, editedAt, routineId }) => ({
				id: (_id as ObjectId).toString(),
				dayOfWeek,
				exercises,
				editedAt,
				routineId: (routineId as ObjectId).toString(),
			})
		);

		const routine = { id: _id.toString(), ...rest };

		return { ...routine, workouts };
	} catch (e) {
		console.error(e);
	}
}

export async function deleteRoutine({ routineId }: { routineId: string }) {
	const session: Session | null = await auth();

	if (!session?.user?.email) {
		throw new Error('unauthorized');
	}

	try {
		const client = await clientPromise;
		const db = client.db('woddy');

		const result = await db
			.collection('routines')
			.deleteOne({ _id: new ObjectId(routineId), user: session.user.email });
		return result;
	} catch (e) {
		console.error(e);
	}
}
