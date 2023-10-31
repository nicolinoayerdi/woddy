import Link from 'next/link';
import { fetchRoutines } from '../api/routines/routines';
import dayjs from 'dayjs';
import { Button } from '../components/Button';

export default async function RoutinesPage() {
	const routines = await fetchRoutines();

	const getDateRange = (init: string, end: string) => {
		return `${dayjs(init).format('DD/MM/YYYY')} - ${dayjs(end).format('DD/MM/YYYY')}`;
	};

	return (
		<div className='flex flex-col gap-1'>
			{routines?.map(routine => (
				<Link key={routine._id.toString()} href={`routines/${routine._id}`}>
					<div className='flex flex-row justify-between items-center gap-4'>
						<b>{routine.title || 'Untitled'}</b>
						<div className='text-sm font-extralight'>
							{getDateRange(routine.initialDate, routine.validUntil)}
						</div>
					</div>
				</Link>
			))}
			<Button>
				<Link href={'create'}>Create</Link>
			</Button>
		</div>
	);
}
