import { ExerciseBlockCard } from './ExerciseBlockCard';

interface Blocks {
	[blockName: string]: any[];
}

export interface WodProps {
	blocks: Blocks;
}

export const Wod = ({ blocks }: WodProps) => {
	return (
		<>
			{Object.keys(blocks).map((blockName: string) => (
				<ExerciseBlockCard
					key={blockName}
					blockName={blockName}
					exercises={blocks[blockName]}></ExerciseBlockCard>
			))}
		</>
	);
};
