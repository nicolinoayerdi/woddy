'use client';

import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Legend, Line } from 'recharts';

export interface ChartProps {
	data: Array<{
		name: string;
		[key: string]: string | number;
	}>;

	lines: Array<ILine>;
}

interface ILine {
	key: string;
	color: string;
}

export const Chart = ({ data, lines }: ChartProps) => {
	return (
		<ResponsiveContainer width='100%' height='100%'>
			<LineChart data={data} margin={{ top: 5, right: 15, left: -15, bottom: 5 }}>
				<CartesianGrid strokeDasharray='4 4' />
				<XAxis dataKey='name' />
				<YAxis />
				<Tooltip />
				<Legend />

				{lines.map((l: ILine) => (
					<Line key={l.key} type='monotone' dataKey={l.key} strokeWidth={3} stroke={l.color} />
				))}
			</LineChart>
		</ResponsiveContainer>
	);
};
