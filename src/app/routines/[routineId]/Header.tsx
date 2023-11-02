'use client';

import ThreeDotsButton from '@/app/components/ThreeDotsButton';
import dayjs from 'dayjs';

interface RoutineHeaderProps {
	routine: {
		title: String;
		initialDate: Date;
		validUntil: Date;
	};
}

export const Header = ({ routine }: RoutineHeaderProps) => {
	const initialDate = dayjs(routine.initialDate);
	const validUntil = dayjs(routine.validUntil);

	return (
		<div>
			<div className='flex flex-row justify-between'>
				<span className='text-center text-3xl font-bold'>{routine.title}</span>
				<ThreeDotsButton
					options={[
						{
							label: 'Delete',
							onClick: () => {
								console.log('delete');
							},
						},
					]}></ThreeDotsButton>
			</div>
			<div className='text-sm font-extralight'>{validUntil.isBefore(dayjs()) && 'Expired'}</div>
			<div className='text-sm font-extralight'>
				From {initialDate.format('DD/MM/YYYY')} to {validUntil.format('DD/MM/YYYY')}
			</div>
		</div>
	);
};
