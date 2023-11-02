import { fetchRoutine } from '@/app/api/routines/routines';
import { Button } from '@/app/components/Button';
import { WorkoutSummary } from '@/app/components/WorkoutSummary';
import dayjs from 'dayjs';
import Link from 'next/link';

export default async function RoutinePage({ params }: { params: { routineId: string } }) {
	const { routineId } = params;

	const routine = await fetchRoutine(routineId);

	if (!routine) return <div>Invalid routine</div>;

	const initialDate = dayjs(routine.initialDate);
	const validUntil = dayjs(routine.validUntil);

	return (
		<div className='flex flex-col gap-4'>
			<div className='text-center text-4xl font-bold'>
				{routine.title}
				<div className='text-sm font-extralight'>{validUntil.isBefore(dayjs()) && 'Expired'}</div>
				<div className='text-sm font-extralight'>
					From {initialDate.format('DD/MM/YYYY')} to {validUntil.format('DD/MM/YYYY')}
				</div>
			</div>

			<div className='flex flex-col gap-4'>
				{routine?.workouts?.map((w: any) => (
					<WorkoutSummary
						key={w.dayOfWeek}
						href={`/routines/${routine._id}/wod/${w.dayOfWeek}`}
						{...w}></WorkoutSummary>
				))}
			</div>

			<Button>
				<Link className='w-fit h-fit' href={`/routines/${routine._id}/wod/add`}>
					Add workout
				</Link>
			</Button>
		</div>
	);
}
