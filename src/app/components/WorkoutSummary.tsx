'use client';

import { Tag } from './Tag';

import dayjs from 'dayjs';
import { ExerciseDto } from '../types';
import ThreeDotsButton from './ThreeDotsButton';
import Link from 'next/link';
import { deleteWorkout } from '../actions/deleteWorkout';
import { Button } from './Button';
import { redirect } from 'next/navigation';

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
				<h2 className='text-lg font-semibold'>{dayjs().day(dayOfWeek).format('dddd')}</h2>

				<ThreeDotsButton
					options={[
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
				<div className='mt-4 flex flex-row w-full gap-2'>
					<Link className='w-full' href={href}>
						<Button className='w-full' type='button' kind='secondary'>
							Edit
						</Button>
					</Link>

					<Link className='w-full' href={`${href}/charts`}>
						<Button type='button' kind='secondary' className='w-full'>
							Charts
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};
