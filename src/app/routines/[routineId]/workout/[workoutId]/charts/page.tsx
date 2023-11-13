import { getChartData } from '@/app/api/charts/charts';
import PageContent from './PageContent';
import { getExercises } from '@/app/api/exercises/exercises';
import { deleteAll } from '@/app/api/workouts/workoutHistory';

function getRandomHexColor() {
	// Generate a random hex color code
	const randomColor = Math.floor(Math.random() * 16777215).toString(16);

	// Ensure the color code always has six digits
	return `#${'0'.repeat(6 - randomColor.length)}${randomColor}`;
}

export default async function ChartsPage({ params, searchParams }: any) {
	const { workoutId } = params;
	const { exercise: exerciseName } = searchParams;

	const exercises = await getExercises();

	const data = exerciseName ? await getChartData({ workoutId, exerciseName, attribute: 'weight' }) : null;

	const chartLines =
		data?.length &&
		Object.keys(data[0])
			.filter(k => k.startsWith('set'))
			.map(k => ({ key: k, color: getRandomHexColor() }));

	console.log({ chartLines });

	return (
		<div className='w-full'>
			<div className='h-[350px] w-full sm:h-[500px] sm:w-[500px]'>
				<PageContent exercises={exercises} chartData={data} chartLines={chartLines}></PageContent>
			</div>
		</div>
	);
}
