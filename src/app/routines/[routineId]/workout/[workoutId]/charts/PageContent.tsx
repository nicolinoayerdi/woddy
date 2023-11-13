'use client';

import { Card } from '@/app/components/Card';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Chart } from './Chart';
import { useEffect } from 'react';

const Select = ({ exercises }: any) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const exercise = searchParams.get('exercise');

	useEffect(() => {
		if (!exercise) {
			const current = new URLSearchParams('');
			current.set('exercise', exercises[0]);

			const search = current.toString();
			const query = search ? `?${search}` : '';

			router.push(`${pathname}${query}`);
		}
	}, [exercise]);

	return (
		<Card>
			<select
				className='w-[100%] h-[100%]'
				name='exercise'
				onChange={e => {
					const current = new URLSearchParams('');
					current.set('exercise', e.target.value.toLowerCase());

					const search = current.toString();
					const query = search ? `?${search}` : '';

					router.push(`${pathname}${query}`);
				}}>
				{exercises?.map((e: string) => (
					<option key={e} value={e}>
						{e}
					</option>
				))}
			</select>
		</Card>
	);
};

export default function PageContent({ exercises, chartData, chartLines }: any) {
	return (
		<div className='mb-6 w-full h-full'>
			<Select exercises={exercises}></Select>
			{chartData && chartLines && (
				<div className='w-full h-full'>
					<Chart data={chartData} lines={chartLines}></Chart>
				</div>
			)}
		</div>
	);
}
