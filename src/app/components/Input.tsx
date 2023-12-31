export const Input = ({ children, className, name, value, onChange, disabled, ...rest }: any) => (
	<input
		className={`focus:placeholder-transparent placeholder-opacity-0 remove-arrow text-center bg-slate-200 rounded-lg px-4 py-0.5 w-full h-full ${className}`}
		type='number'
		disabled={disabled}
		id={name}
		name={name}
		value={value}
		onChange={onChange}
		{...rest}
	/>
);
