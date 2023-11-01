export interface SetDto {
	order: number;
	weight: number;
	repetitions: number;
}

export interface ExerciseDto {
	title: string;
	sets: Array<SetDto>;
}

export interface WorkoutDto {
	dayOfWeek: DayOfWeek;
	routineId: ObjectId;
	exercises: Array<ExerciseDto>;
}

export type DayOfWeek = 1 | 2 | 3 | 4 | 5 | 6 | 7;
