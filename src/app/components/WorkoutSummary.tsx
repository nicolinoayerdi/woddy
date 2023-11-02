'use client';

import { Tag } from './Tag';

import dayjs from 'dayjs';
import { ExerciseDto } from '../types';
import ThreeDotsButton from './ThreeDotsButton';
import Link from 'next/link';
import { deleteWorkout } from '../actions/deleteWorkout';

export interface WorkoutSummaryProps {
	id: string;
	dayOfWeek: number;
	exercises: Array<ExerciseDto>;
	editedAt: Date;
	href: string;
}

export const WorkoutSummary = ({ id, dayOfWeek, exercises, editedAt, href }: WorkoutSummaryProps) => {
	return (
		<div className='flex flex-col bg-white rounded-lg shadow-md p-4 gap-1'>
			<div className='flex flex-row justify-between items-center'>
				<Link className='flex items-center' href={href}>
					<h2 className='text-lg font-semibold'>{dayjs().day(dayOfWeek).format('dddd')}</h2>
				</Link>

				<ThreeDotsButton
					options={[
						{
							label: 'Edit',
							onClick: () => {
								console.log('edit');
							},
						},
						{
							label: 'Delete',
							onClick: () => {
								deleteWorkout({ workoutId: id });
							},
						},
					]}></ThreeDotsButton>
			</div>
			<div>
				<p className='text-gray-600 text-sm '>Exercises: {exercises.length}</p>
				<div className='text-gray-600 text-sm font-extralight'>
					Last update {dayjs(editedAt).format('DD/MM/YYYY')}
				</div>
				<div className='mt-4'>
					<ul>
						<div className='flex flex-row gap-1'>
							<Tag key={1}>Tag 1</Tag>
							<Tag key={2}>Tag 2</Tag>
							<Tag key={3}>Tag 3</Tag>
						</div>
					</ul>
				</div>
			</div>
		</div>
	);
};
