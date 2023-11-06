import Link from 'next/link';
import { fetchRoutines } from '../api/routines/routines';
import dayjs from 'dayjs';
import { Button } from '../components/Button';
import { RoutineCard } from './RoutineCard';

export default async function RoutinesPage() {
	const routines = await fetchRoutines();

	const getDateRange = (init: string, end: string) => {
		return `${dayjs(init).format('DD/MM/YYYY')} - ${dayjs(end).format('DD/MM/YYYY')}`;
	};

	{
		/* <Link key={routine._id.toString()} href={`routines/${routine._id}`}>
					<div className='flex flex-row justify-between items-center gap-4'>
						<div>
							<b>{routine.title || 'Untitled'}</b>
						</div>
					</div>
				</Link> */
	}
	return (
		<div className='flex flex-col gap-2'>
			{routines?.map(routine => (
				<RoutineCard
					routineId={routine._id.toString()}
					key={routine._id.toString()}
					title={routine.title || 'Untitled'}
					content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac turpis a nulla luctus tincidunt. Quisque vel augue id nulla congue fringilla. Nulla nec eros quam. Aenean in luctus justo.'
					link={{ url: `routines/${routine._id}`, label: 'Workouts' }}
				/>
			))}

			<Link href={'routines/create'}>
				<Button className='w-full'>Create</Button>
			</Link>
		</div>
	);
}
