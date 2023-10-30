'use server';

import { revalidatePath } from 'next/cache';
import { ObjectId } from 'mongodb';
import { createRoutine as apiCreateRoutine } from '../api/routines/routines';
import dayjs from 'dayjs';

interface RoutineDto {
	title: string;
	initialDate: Date;
	validUntil?: Date;
}

export async function createRoutine(prevState: any, formData: FormData) {
	const formValues: any = {
		title: formData.get('title'),
		initialDate: formData.get('initial-date'),
		expirationDate: formData.get('expiration-date'),
	};

	if (!formValues.title || !formValues.initialDate || !formValues.expirationDate) {
		return { message: 'Missing values' };
	}

	const routine = {
		title: formData.get('title')?.toString() || 'Untitled',
		initialDate: formData.get('initial-date')
			? dayjs(formData.get('initial-date')?.toString()).toDate()
			: new Date(),
		validUntil: formData.get('expiration-date')
			? dayjs(formData.get('expiration-date')?.toString()).toDate()
			: null,
	};

	try {
		const routineCreated = await apiCreateRoutine({ routine });
		revalidatePath('/');
		return { message: 'Routine created ', routineId: routineCreated?.insertedId };
	} catch (e) {
		return { message: 'Failed to update routine' };
	}
}
