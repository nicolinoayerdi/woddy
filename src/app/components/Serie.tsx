export const Serie = ({ reps, weight }: { reps: number; weight?: number }) => (
	<div className='w-20 h-24 bg-gray-800 text-white rounded-md p-4 flex flex-col justify-center text-center'>
		<div>
			<p className='mt-2'>{reps}</p>
		</div>
		<div className='mt-4'>{weight && <p>{weight} kg</p>}</div>
	</div>
);
