import dayjs from 'dayjs';
import { ExerciseDto } from '@/app/types';
import { getWorkoutHistory } from '../workouts/workoutHistory';

interface ExerciseHistoryEntry extends ExerciseDto {
	editedAt: Date;
}

interface ChartDataDto {
	name: string;
	[key: string]: number | string;
}

export async function getChartData({
	workoutId,
	exerciseName,
	attribute = 'weight',
}: {
	workoutId: string;
	exerciseName: string;
	attribute: 'weight' | 'repetitions';
}) {
	const history = await getWorkoutHistory({ workoutId });

	// aplanar
	const exercisesFlattened: Array<ExerciseHistoryEntry> = history
		.reduce(
			(previousValue: any, { exercises, editedAt }: any) => [
				...previousValue,
				...exercises.map((e: ExerciseDto) => ({ title: e.title, sets: e.sets, editedAt })),
			],
			[]
		)
		.filter(e =>
			e.title ? e.title.toLowerCase().startsWith(exerciseName.toLowerCase()) : false
		) as Array<ExerciseHistoryEntry>;

	// map to chart entries
	const mappedData: Array<ChartDataDto> = exercisesFlattened.reduce(
		(prev: any, { sets, editedAt }: ExerciseHistoryEntry) => {
			const mapped = sets.reduce((prev, current) => {
				return { ...prev, [`set${current.order}`]: current[attribute] };
			}, {});

			return [...prev, { ...mapped, name: dayjs(editedAt).format('DD/MM') }];
		},
		[]
	);

	return mappedData;
}
