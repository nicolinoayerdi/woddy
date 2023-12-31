'use client';

import React, { useState, useEffect, useRef, Ref, ButtonHTMLAttributes, LegacyRef, DetailedHTMLProps } from 'react';

const ThreeDotsButton = ({ options }: { options: Array<{ label: string; onClick: () => void }> }) => {
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
				<button
					type='button'
					className='inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50'
					onClick={toggleMenu}>
					<div className='font-black'>&#xFE19;</div>
				</button>
			</div>

			{isOpen && (
				<div
					className='origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'
					role='menu'
					aria-orientation='vertical'>
					<div className='py-1' role='none'>
						{options.map((option, index) => (
							<button
								key={index}
								className='w-full text-start block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
								onClick={option.onClick}
								type='button'
								role='menuitem'>
								{option.label}
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default ThreeDotsButton;
