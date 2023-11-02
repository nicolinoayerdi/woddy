import { fetchRoutine } from '@/app/api/routines/routines';
import { Button } from '@/app/components/Button';
import { WorkoutSummary } from '@/app/components/WorkoutSummary';
import Link from 'next/link';
import { Header } from './Header';
import { notFound } from 'next/navigation';

export default async function RoutinePage({ params }: { params: { routineId: string } }) {
	const { routineId } = params;

	const routine = await fetchRoutine(routineId);

	if (!routine) return notFound();

	return (
		<div className='flex flex-col gap-4'>
			<Header routine={routine}></Header>

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
