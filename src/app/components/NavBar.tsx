'use client';

import React, { useState, useEffect, useRef, Ref, ButtonHTMLAttributes, LegacyRef, DetailedHTMLProps } from 'react';
import Image from 'next/image';
import logo from 'public/woddy.svg';
import { signOut, useSession } from 'next-auth/react';

function UserImage({ image, signOut }: { image: string; signOut: () => void }) {
	const [isOpen, setIsOpen] = useState(false);
	const buttonRef = useRef(null);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (buttonRef.current && !(buttonRef.current as HTMLDivElement).contains(event.target as Node)) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		if (isOpen) {
			window.addEventListener('click', handleClickOutside);
		} else {
			window.removeEventListener('click', handleClickOutside);
		}

		return () => {
			window.removeEventListener('click', handleClickOutside);
		};
	}, [isOpen]);

	return (
		<div className='relative inline-block text-left' ref={buttonRef}>
			<div>
				<Image
					onClick={toggleMenu}
					src={image}
					width={10}
					height={10}
					alt='user-photo'
					className='w-10 h-10 rounded-full cursor-pointer'></Image>
			</div>

			{isOpen && (
				<div
					className='origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'
					role='menu'
					aria-orientation='vertical'>
					<div className='py-1' role='none'>
						<button
							className='w-full text-start block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
							onClick={signOut}
							type='button'
							role='menuitem'>
							Logout
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

export function NavBar() {
	const { data: session } = useSession();

	return (
		<nav className='my-3 flex justify-between '>
			<Image src={logo} alt='woddy-logo'></Image>
			{session?.user ? (
				<div className='flex justify-end items-center gap-4'>
					<a href='/'>Home</a>
					<a href={`/routines`}>Routines</a>
					<a href='/charts'>Charts</a>
					<UserImage
						image={session.user.image as string}
						signOut={() => signOut({ callbackUrl: '/' })}></UserImage>
				</div>
			) : null}
		</nav>
	);
}
