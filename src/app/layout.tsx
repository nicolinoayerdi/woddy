import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import logo from 'public/woddy.svg';
import Image from 'next/image';
import { fetchCurrentRoutine, fetchRoutine } from './api/routines/routines';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Woddy',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const currentRoutine = await fetchCurrentRoutine();

	const currentRoutineId = currentRoutine?._id.toString() || undefined;

	const dayOfWeek = new Date().getDay();

	return (
		<html lang='en'>
			<body className={`${inter.className} flex flex-col items-center bg-slate-100`}>
				<div className='px-8 bg-gray-100 shadow-lg fixed top-0 left-0 right-0 z-10'>
					<nav className='my-3 flex justify-between '>
						<Image src={logo} alt='woddy-logo'></Image>
						<div className='flex justify-end items-center gap-4'>
							<a href='/'>Home</a>
							<a href={`/routines`}>Routines</a>
							{currentRoutine && <a href={`/routines/${currentRoutineId}`}>Current</a>}
							<a href='/charts'>Charts</a>
						</div>
					</nav>
				</div>
				<div className='mt-20 w-[90%] flex sm:max-w-md'>{children}</div>
			</body>
		</html>
	);
}
