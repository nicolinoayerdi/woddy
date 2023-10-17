import { WodSummary } from '@/app/components/WodSummary';
import dayjs from 'dayjs';
import Link from 'next/link';

export default function RoutinePage() {
	const routine = {
		id: 1,
		wods: [
			{
				dayOfWeek: 1,
				blocks: 5,
				exercises: 10,
				avgDuration: 90,
				tags: ['chest', 'legs', 'push', 'core'],
			},
			{
				dayOfWeek: 3,
				blocks: 4,
				exercises: 12,
				avgDuration: 90,
				tags: ['back', 'legs', 'biceps', 'push'],
			},
			{
				dayOfWeek: 5,
				blocks: 5,
				exercises: 10,
				avgDuration: 60,
				tags: ['shoulders', 'triceps', 'biceps'],
			},
		],
		validUntil: new Date('2023/10/19'),
	};

	const expired = dayjs(routine.validUntil).isBefore(dayjs());

	return (
		<>
			<div className='text-center py-4 text-4xl font-bold'>
				Routine
				<div className='text-sm font-extralight'>
					{expired ? 'Expired' : `Valid until ${dayjs(routine.validUntil).format('DD/MM/YYYY')}`}
				</div>
			</div>

			<div className='flex flex-col gap-6'>
				{routine.wods.map(wod => (
					<Link key={wod.dayOfWeek} href={`/routine/${routine.id}/wod/${wod.dayOfWeek}`}>
						<WodSummary {...wod}></WodSummary>
					</Link>
				))}
			</div>
		</>
	);
}
