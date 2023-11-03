import { fetchWorkout } from '@/app/api/workouts/workouts';
import { Wod } from '../../../../components/Workout';
import dayjs from 'dayjs';

export default async function WodPage({ params }: { params: { routineId: string; dayOfWeek: number } }) {
	const dayOfWeek = Number(params.dayOfWeek);
	const { routineId } = params;
	const wod = await fetchWorkout({ routineId, dayOfWeek });

	if (!wod) return <div>No workout for {dayjs().day(dayOfWeek).format('dddd')}</div>;

	return (
		wod && (
			<div className='flex flex-col'>
				<div className='text-center py-4 text-4xl font-bold'>
					{dayjs().day(wod.dayOfWeek).format('ddd')} workout
				</div>

				<Wod routineId={routineId} dayOfWeek={wod.dayOfWeek} exercises={wod.exercises}></Wod>
			</div>
		)
	);
}
