import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import logo from 'public/woddy.svg';
import Image from 'next/image';

import { NavBar } from './components/NavBar';
import { Providers } from './components/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Woddy',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className={`${inter.className} bg-slate-100`}>
				<Providers>
					<div className='flex flex-col items-center '>
						<div className='px-8 bg-gray-100 shadow-lg fixed top-0 left-0 right-0 z-10'>
							<NavBar />
						</div>
						<div className='mt-20 w-[90%] flex sm:max-w-md'>{children}</div>
					</div>
				</Providers>
			</body>
		</html>
	);
}
