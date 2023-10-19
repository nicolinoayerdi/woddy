import Link from 'next/link';
import { Tag } from './Tag';

import dayjs from 'dayjs';

export interface WodSummaryProps {
	dayOfWeek: number;
	avgDuration: number;
	blocks: number;
	exercises: number;
	tags: Array<String>;
}

export const WodSummary = ({ dayOfWeek, avgDuration, blocks, exercises, tags }: WodSummaryProps) => (
	<div className='bg-white rounded-lg shadow-md p-4'>
		<div>
			<h2 className='text-xl font-semibold mb-2'>{dayjs().day(dayOfWeek).format('dddd')}</h2>
			<p className='text-gray-600'>Avg duration: {avgDuration} minutes</p>
			<p className='text-gray-600'># Blocks: {blocks}</p>
			<p className='text-gray-600'># Exercises: {exercises}</p>
		</div>
		<div className='mt-4'>
			<ul>
				<div className='flex flex-row gap-1'>
					{tags?.map((tag, index) => (
						<Tag key={index}>{tag}</Tag>
					))}
				</div>
			</ul>
		</div>
	</div>
);
