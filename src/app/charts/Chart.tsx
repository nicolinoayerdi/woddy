'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
	{
		name: 'Nov 6th',
		uv: 80,
		pv: 2400,
		amt: 2400,
	},
	{
		name: 'Nov 13th',
		uv: 70,
		pv: 1398,
		amt: 2210,
	},
	{
		name: 'Nov 20st',
		uv: 77,
		pv: 9800,
		amt: 2290,
	},
	{
		name: 'Nov 27th',
		uv: 85,
		pv: 3908,
		amt: 2000,
	},
];

export const Chart = () => {
	//const demoUrl = 'https://codesandbox.io/s/area-chart-in-responsive-container-e6dx0';

	return (
		<ResponsiveContainer>
			<AreaChart
				data={data}
				margin={{
					top: 10,
					right: 30,
					left: 0,
					bottom: 0,
				}}>
				<CartesianGrid strokeDasharray='3 3' />
				<XAxis dataKey='name' />
				<YAxis />
				<Tooltip />
				<Area type='monotone' dataKey='uv' stroke='#8884d8' fill='#8884d8' />
			</AreaChart>
		</ResponsiveContainer>
	);
};
