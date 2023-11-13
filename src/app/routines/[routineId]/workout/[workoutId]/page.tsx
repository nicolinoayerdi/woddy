import { fetchWorkout } from '@/app/api/workouts/workouts';
import dayjs from 'dayjs';
import { Workout } from './Workout';

export default async function WodPage({ params }: { params: { routineId: string; workoutId: string } }) {
	const { routineId, workoutId } = params;
	const wod = await fetchWorkout({ routineId, workoutId });

	return (
		wod && (
			<div className='flex flex-col'>
				<div className='text-center py-4 text-4xl font-bold'>
					{dayjs().day(wod.dayOfWeek).format('ddd')} workout
				</div>

				<Workout routineId={routineId} workoutId={workoutId} exercises={wod.exercises}></Workout>
			</div>
		)
	);
}
