import dayjs from 'dayjs';
import clientPromise from '../../../lib/mongodb';
import { ExerciseDto } from '@/app/types';
import { ObjectId } from 'mongodb';

export interface WorkoutHistoryDto {
	_id: ObjectId;
	exercises: Array<ExerciseDto>;
	workoutId: string;
	duration: number;
	editedAt: Date;
}

export async function getWorkoutHistory({ workoutId }: { workoutId: string }): Promise<Array<WorkoutHistoryDto>> {
	const client = await clientPromise;
	const db = client.db('woddy');
	return db.collection('workouts_history').find({ workoutId: workoutId }).sort({ editedAt: 1 }).toArray() as Promise<
		Array<WorkoutHistoryDto>
	>;
}
