enum DayOfWeek {
	Sunday,
	Monday,
	Tuesday,
	Wednesday,
	Thursday,
	Friday,
	Saturday,
}

interface ExcerciseSet {
	order?: number;
	repetitions?: number;
	weight?: number;
}

interface Exercise {
	id: number;
	title: String;
	muscle: String;
	type?: 'Push' | 'Pull';
	block: number;
	amountOfSets?: number;
	sets: Array<ExcerciseSet>;
}

interface Wod {
	dayOfWeek: DayOfWeek;
	exercises: Array<Exercise>;
}

interface Routine {
	wods: Array<Wod>;
	validUntil: Date;
}

interface ExcerciseHistory {
	exerciseId: number;
	title: String;
	history: [{ date: Date; sets: [ExcerciseSet] }];
}

const wod0: Wod = {
	dayOfWeek: DayOfWeek.Monday,
	exercises: [
		{
			id: 1,
			title: 'Sentadillas',
			muscle: 'Piernas',
			type: 'Push',
			block: 1,
			sets: [
				{
					order: 1,
					repetitions: 8,
					weight: 60,
				},
				{
					order: 2,
					repetitions: 6,
					weight: 70,
				},
				{
					order: 3,
					repetitions: 4,
					weight: 80,
				},
				{
					order: 4,
					repetitions: 6,
					weight: 65,
				},
				{
					order: 5,
					repetitions: 12,
					weight: 50,
				},
			],
		},
		{
			id: 2,
			title: 'Rollout rodillo',
			muscle: 'Abs',
			block: 1,
			amountOfSets: 5,
			sets: [
				{
					repetitions: 10,
				},
			],
		},
		{
			id: 3,
			title: 'Press banco',
			muscle: 'Pecho',
			type: 'Push',
			block: 2,
			amountOfSets: 5,
			sets: [
				{
					repetitions: 10,
				},
			],
		},
		{
			id: 4,
			title: 'Saltos con carga',
			muscle: 'Piernas',
			block: 2,
			amountOfSets: 5,
			sets: [
				{
					repetitions: 10,
				},
			],
		},
		{
			id: 5,
			title: 'Perro de caza rodillas elevadas',
			muscle: 'Core',
			block: 2,
			amountOfSets: 5,
			sets: [
				{
					repetitions: 10,
				},
			],
		},
		{
			id: 6,
			title: 'Press inclinado',
			muscle: 'Pecho',
			type: 'push',
			block: 3,
			amountOfSets: 5,
			sets: [
				{
					repetitions: 10,
				},
			],
		},
		{
			id: 7,
			title: 'Estocadas laterales',
			muscle: 'Piernas',
			type: 'push',
			block: 3,
			amountOfSets: 5,
			sets: [
				{
					repetitions: 10,
				},
			],
		},
		{
			id: 8,
			title: 'Aperturas',
			muscle: 'Pecho',
			type: 'push',
			block: 4,
			amountOfSets: 5,
			sets: [
				{
					repetitions: 10,
				},
			],
		},
		{
			id: 9,
			title: 'Bulgaras',
			muscle: 'Piernas',
			type: 'push',
			block: 4,
			amountOfSets: 5,
			sets: [
				{
					repetitions: 10,
				},
			],
		},
		{
			id: 10,
			title: 'Triceps en espaldar',
			muscle: 'Triceps',
			type: 'Push',
			block: 5,
			amountOfSets: 5,
			sets: [
				{
					repetitions: 10,
				},
			],
		},
	],
};

const wod1: Wod = {
	dayOfWeek: DayOfWeek.Monday,
	exercises: [
		// Block 1
		{
			id: 1,
			title: 'Squats',
			muscle: 'Legs',
			block: 1,
			sets: [
				{ repetitions: 5, weight: 135 },
				{ repetitions: 5, weight: 155 },
			],
		},
		// Block 2
		{
			id: 2,
			title: 'Bench Press',
			muscle: 'Chest',
			type: 'Push',
			block: 2,
			sets: [
				{ repetitions: 8, weight: 135 },
				{ repetitions: 8, weight: 155 },
			],
		},
		// Block 3
		{
			id: 3,
			title: 'Pull-Ups',
			muscle: 'Back',
			type: 'Pull',
			block: 3,
			sets: [{ repetitions: 6 }, { repetitions: 6 }],
		},
		// Block 4
		{
			id: 4,
			title: 'Deadlifts',
			muscle: 'Back',
			type: 'Pull',
			block: 4,
			sets: [
				{ repetitions: 5, weight: 225 },
				{ repetitions: 5, weight: 245 },
			],
		},
		// Block 5
		{
			id: 5,
			title: 'Push-Ups',
			muscle: 'Chest',
			type: 'Push',
			block: 5,
			sets: [{ repetitions: 10 }, { repetitions: 10 }],
		},
	],
};

// Mock data for WOD 2
const wod2: Wod = {
	dayOfWeek: DayOfWeek.Wednesday,
	exercises: [
		// Block 1
		{
			id: 6,
			title: 'Lunges',
			muscle: 'Legs',
			block: 1,
			sets: [
				{ repetitions: 8, weight: 65 },
				{ repetitions: 8, weight: 75 },
			],
		},
		// Block 2
		{
			id: 7,
			title: 'Dumbbell Curls',
			muscle: 'Arms',
			type: 'Push',
			block: 2,
			sets: [
				{ repetitions: 10, weight: 20 },
				{ repetitions: 10, weight: 25 },
			],
		},
		// Block 3
		{
			id: 8,
			title: 'Pull-Ups',
			muscle: 'Back',
			type: 'Pull',
			block: 3,
			sets: [{ repetitions: 6 }, { repetitions: 6 }],
		},
		// Block 4
		{
			id: 9,
			title: 'Deadlifts',
			muscle: 'Back',
			type: 'Pull',
			block: 4,
			sets: [
				{ repetitions: 5, weight: 205 },
				{ repetitions: 5, weight: 225 },
			],
		},
		// Block 5
		{
			id: 10,
			title: 'Push-Ups',
			muscle: 'Chest',
			type: 'Push',
			block: 5,
			sets: [{ repetitions: 12 }, { repetitions: 12 }],
		},
	],
};

const routine: Routine = {
	wods: [wod0, wod1, wod2],
	validUntil: new Date(),
};
