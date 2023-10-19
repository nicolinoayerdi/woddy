import Link from 'next/link';
import { fetchRoutines } from '../api/routines/routines';
import dayjs from 'dayjs';

export default async function RoutinesPage() {
	const routines = await fetchRoutines();
	console.log({ routines });

	return (
		<div className='flex flex-col'>
			{routines?.map(routine => (
				<Link key={routine._id.toString()} href={`routine/${routine._id}`}>
					{dayjs(routine.initialDate).format('DD/MM/YYYY')} - {dayjs(routine.validUntil).format('DD/MM/YYYY')}
				</Link>
			))}
		</div>
	);
}
