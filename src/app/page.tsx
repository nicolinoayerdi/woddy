import Image from 'next/image';
import { Wod } from './components/Wod';

export default function Home() {
	const wod = {
		dayOfWeek: 'Monday',
		exercises: {
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
	};
	return <></>;
}
