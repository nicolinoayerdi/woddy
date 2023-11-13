'use client';

import { Breadcrumbs, BreadcrumbsProps } from '@/app/components/Breadcrumbs';
import { useParams, usePathname } from 'next/navigation';

export default function Layout({ children }) {
	const { workoutId, routineId } = useParams();
	const pathname = usePathname();

	const items = [
		routineId ? { href: `/routines/${routineId}`, label: 'Routine' } : null,
		workoutId ? { href: `/routines/${routineId}/workout/${workoutId}`, label: 'Workout' } : null,
		pathname.includes('/charts')
			? { href: `/routines/${routineId}/workout/${workoutId}/charts`, label: 'Charts' }
			: null,
	];

	const breadcrumbsItems: BreadcrumbsProps = { items: items.filter(i => i !== null) } as BreadcrumbsProps;

	return (
		<div className='flex flex-col gap-2'>
			<Breadcrumbs {...breadcrumbsItems}></Breadcrumbs>
			<div>{children}</div>
		</div>
	);
}
