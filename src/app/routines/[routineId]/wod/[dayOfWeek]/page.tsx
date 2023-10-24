import { fetchWorkout } from '@/app/api/workouts/workouts';
import { Wod } from '../../../../components/Workout';
import dayjs from 'dayjs';

/* const wod = {
		dayOfWeek: 'Monday',
		blocks: {
			'1': [
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
			],
			'2': [
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
			],
			'3': [
				{
					id: 6,
					title: 'Press inclinado',
					muscle: 'Pecho',
					type: 'Push',
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
					type: 'Push',
					block: 3,
					amountOfSets: 5,
					sets: [
						{
							repetitions: 10,
						},
					],
				},
			],
			'4': [
				{
					id: 8,
					title: 'Aperturas',
					muscle: 'Pecho',
					type: 'Push',
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
					type: 'Push',
					block: 4,
					amountOfSets: 5,
					sets: [
						{
							repetitions: 10,
						},
					],
				},
			],
			'5': [
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
		},
	}; */

export default async function WodPage({ params }: { params: { routineId: string; dayOfWeek: number } }) {
	const dayOfWeek = Number(params.dayOfWeek);
	const { routineId } = params;
	const wod = await fetchWorkout({ routineId, dayOfWeek });

	if (!wod) return <div>No workout for {dayjs().day(dayOfWeek).format('dddd')}</div>;

	return (
		wod && (
			<>
				<div className='text-center py-4 text-4xl font-bold'>
					{dayjs().day(wod.dayOfWeek).format('ddd')} workout
				</div>
				<Wod routineId={routineId} dayOfWeek={wod.dayOfWeek} blocks={wod.blocks}></Wod>
			</>
		)
	);
}
