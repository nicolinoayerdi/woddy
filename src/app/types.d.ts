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
	dayOfWeek: 1 | 2 | 3 | 4 | 5 | 6 | 7;
	routineId: ObjectId;
	exercises: Array<ExerciseDto>;
}
