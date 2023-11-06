// _app.tsx or _app.js
'use client;';

import { useEffect } from 'react';

export const Providers = () => {
	useEffect(() => {
		import('preline');
	}, []);
};
