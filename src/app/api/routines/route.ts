import clientPromise from '../../../lib/mongodb';
import { NextResponse } from 'next/server';
import { fetchRoutines } from './routines';

export async function GET(request: Request) {
	try {
		const routines = await fetchRoutines();
		return NextResponse.json({ routines }, { status: 200 });
	} catch (e) {
		console.error(e);
	}
}
