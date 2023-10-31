export const Input = ({ children, className, name, value, onChange, disabled }: any) =>
	disabled ? (
		<div className='remove-arrow w-14 text-center bg-slate-200 leading-6 font-normal rounded-lg px-4 py-0.5'>
			{children || value}
		</div>
	) : (
		<input
			className={`focus:placeholder-transparent placeholder-opacity-0 remove-arrow text-center bg-slate-200 rounded-lg px-4 py-0.5 ${className}`}
			type='number'
			id={name}
			name={name}
			value={value}
			onChange={onChange}
		/>
	);
