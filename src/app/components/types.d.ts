import { IExercise } from './types.d';
export interface IExerciseSet {
	previous?: number;
	order?: number;
	weight?: number;
	repetitions?: number;
}

export interface IExercise {
	id: string;
	title: String;
	sets: Array<{ order: number; previous?: number; weight?: number; repetitions?: number }>;
	amountOfSets: number;
}

export interface IWorkoutHistory {
	workoutId: string;
	editedAt: Date;
	blocks: {
		[blockName: string]: Array<IExercise>;
	};
}
