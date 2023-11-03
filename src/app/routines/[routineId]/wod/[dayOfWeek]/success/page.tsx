import Link from 'next/link';

export default function Success({ params }) {
	const { routineId, dayOfWeek } = params;

	return (
		<div>
			Successfully edited workout
			<Link href={`/routines/${routineId}/wod/${dayOfWeek}`}>Go back</Link>
		</div>
	);
}
