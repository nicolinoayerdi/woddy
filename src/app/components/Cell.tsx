export const Cell = ({ children, className }: any) => (
	//className='remove-arrow w-14 text-center bg-slate-200 leading-6 font-normal rounded-lg px-4 py-0.5'
	<td className={`text-center md:leading-6 bg-slate-200 leading-6 font-normal rounded-lg ${className}`}>
		{children}
	</td>
);
