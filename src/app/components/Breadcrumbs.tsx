import Link from 'next/link';

const BreadCrumb = () => (
	<>
		<li className='inline-flex items-center'>
			<a
				className='flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:focus:text-blue-500'
				href='#'>
				Home
			</a>
			<svg
				className='flex-shrink-0 h-5 w-5 text-gray-400 dark:text-gray-600 mx-2'
				width='16'
				height='16'
				viewBox='0 0 16 16'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
				aria-hidden='true'>
				<path d='M6 13L10 3' stroke='currentColor' stroke-linecap='round' />
			</svg>
		</li>
		<li className='inline-flex items-center'>
			<a
				className='flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:focus:text-blue-500'
				href='#'>
				App Center
				<svg
					className='flex-shrink-0 h-5 w-5 text-gray-400 dark:text-gray-600 mx-2'
					width='16'
					height='16'
					viewBox='0 0 16 16'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
					aria-hidden='true'>
					<path d='M6 13L10 3' stroke='currentColor' stroke-linecap='round' />
				</svg>
			</a>
		</li>
		<li
			className='inline-flex items-center text-sm font-semibold text-gray-800 truncate dark:text-gray-200'
			aria-current='page'>
			Application
		</li>
	</>
);

export interface BreadcrumbsProps {
	items: Array<{
		href: string;
		label: string;
	}>;
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
	return (
		<ol className='flex items-center whitespace-nowrap' aria-label='Breadcrumb'>
			{items.map((i, index) => (
				<li key={i.href} className='inline-flex items-center'>
					<Link
						className='flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:focus:text-blue-500'
						href={i.href}>
						{i.label}
					</Link>
					{index !== items.length - 1 && (
						<svg
							className='flex-shrink-0 h-5 w-5 text-gray-400 dark:text-gray-600 mx-2'
							width='16'
							height='16'
							viewBox='0 0 16 16'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
							aria-hidden='true'>
							<path d='M6 13L10 3' stroke='currentColor' stroke-linecap='round' />
						</svg>
					)}
				</li>
			))}
		</ol>
	);
};
