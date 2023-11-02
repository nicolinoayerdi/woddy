'use server';

import { revalidatePath } from 'next/cache';
import { deleteRoutine as apiDeleteroutine } from '../api/routines/routines';

export async function deleteRoutine({ routineId }: { routineId: string }) {
	try {
		const deleted = await apiDeleteroutine({ routineId });
		revalidatePath('/routines/[routineId]');
		console.log({ deleted });
		return { message: 'routine deleted ', deleted };
	} catch (e) {
		return { message: 'Failed to delete routine' };
	}
}
