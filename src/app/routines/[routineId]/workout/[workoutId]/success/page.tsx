import Link from 'next/link';

interface SuccessProps {
	params: {
		routineId: string;
		workoutId: string;
	};
}

export default function Success({ params }: SuccessProps) {
	const { routineId, workoutId } = params;

	return (
		<div className='flex flex-col gap-4'>
			<div>Successfully edited workout</div>
			<Link href={`/routines/${routineId}/workout/${workoutId}`}>Go back</Link>
		</div>
	);
}
