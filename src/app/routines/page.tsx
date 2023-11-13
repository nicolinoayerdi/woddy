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

	return (
		<div className='flex flex-col gap-2'>
			{routines?.map(routine => (
				<RoutineCard
					routineId={routine._id.toString()}
					key={routine._id.toString()}
					title={routine.title || 'Untitled'}
					content='Description'
					link={{ url: `routines/${routine._id}`, label: 'Workouts' }}
				/>
			))}

			<Link href={'routines/create'}>
				<Button className='w-full'>Create</Button>
			</Link>
		</div>
	);
}
