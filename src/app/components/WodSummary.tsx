import Link from 'next/link';
import { Tag } from './Tag';

import dayjs from 'dayjs';
import { ExerciseDto } from '../types';

export interface WodSummaryProps {
	dayOfWeek: number;
	exercises: Array<ExerciseDto>;
	editedAt: Date;
}

export const WodSummary = ({ dayOfWeek, exercises, editedAt }: WodSummaryProps) => {
	console.log(editedAt);

	return (
		<div className='flex flex-col items-center bg-white rounded-lg shadow-md p-4'>
			<div>
				<h2 className='text-xl font-semibold mb-2'>{dayjs().day(dayOfWeek).format('dddd')}</h2>
				<p className='text-gray-600 text-sm'>Exercises: {exercises.length}</p>
			</div>
			<div className='text-gray-600 text-sm'>{dayjs(editedAt).format('DD/MM/YYYY')}</div>
			{/* <div className='mt-4'>
			<ul>
				<div className='flex flex-row gap-1'>
					{tags?.map((tag, index) => (
						<Tag key={index}>{tag}</Tag>
					))}
				</div>
			</ul>
		</div> */}
		</div>
	);
};
