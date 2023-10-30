import { fetchRoutine } from '@/app/api/routines/routines';
import { Button } from '@/app/components/Button';
import { WodSummary } from '@/app/components/WodSummary';
import dayjs from 'dayjs';
import Link from 'next/link';

export default async function RoutinePage({ params }: { params: { routineId: string } }) {
	const { routineId } = params;

	const routine = await fetchRoutine(routineId);

	console.log({ routine });

	if (!routine) return <div>Invalid routine</div>;

	return (
		<>
			<div className='text-center py-4 text-4xl font-bold'>
				{routine.title}
				<div className='text-sm font-extralight'>
					{dayjs(routine.validUntil).isBefore(dayjs())
						? 'Expired'
						: `Valid until ${dayjs(routine.validUntil).format('DD/MM/YYYY')}`}
				</div>
			</div>

			<div className='flex flex-col gap-6'>
				{routine?.wods?.map((wod: any) => (
					<Link key={wod.dayOfWeek} href={`/routines/${routine._id}/wod/${wod.dayOfWeek}`}>
						<WodSummary {...wod}></WodSummary>
					</Link>
				))}
			</div>

			<Button>Add workout</Button>
		</>
	);
}
