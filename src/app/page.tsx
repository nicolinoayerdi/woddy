'use client';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from './components/Button';

export default function Home() {
	const { data: session } = useSession();
	const router = useRouter();

	if (session?.user) router.push('/routines');

	return <Button onClick={() => signIn()}>Identify</Button>;

	//redirect('/routines');
}
