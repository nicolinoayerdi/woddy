import Link from 'next/link';

interface SuccessProps {
	params: {
		routineId: string;
		dayOfWeek: string;
	};
}

export default function Success({ params }: SuccessProps) {
	const { routineId, dayOfWeek } = params;

	return (
		<div className='flex flex-col gap-4'>
			<div>Successfully edited workout</div>
			<Link href={`/routines/${routineId}/wod/${dayOfWeek}`}>Go back</Link>
		</div>
	);
}
