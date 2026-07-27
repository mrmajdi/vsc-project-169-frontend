// @vsc repo:vsc-project-169-frontend file:src/components/ui/Input.tsx task:f6-src-components-ui-input-tsx module:frontend session:169
import React from 'react';

interface InputProps {
	type?: string;
	placeholder?: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	disabled?: boolean;
	error?: boolean;
	className?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({
		type = 'text',
		placeholder,
		value,
		onChange,
		disabled = false,
		error = false,
		className = '',
		...rest
	},
	ref) => {
		const baseClasses =
			'w-full border border-gray rounded-md px-py text-base focus outline none focus ring primary';
		const errorClasses =
			error ? 'border-danger ring-danger' : '';
		const combinedCls =
			baseClasses + ' ' + errorClasses + ' ' + className;

	return (
		input {
			type,
			value,
			onChange,
			onBlur,
			onFocus,
			onKeyDown,
			onKeyUp,
			onKeyPress,
			onMouseDown,
			onMouseUp,
			onClick,
			onDragStart,
			onDragEnd,
			onDragEnter,
			onDragLeave,
			onDragOver,
			onDragLeave,
			onDrop,
			pasteDisabled ? undefined : undefined // keep generic handling omitted for brevity
				className={combinedCls},
				ref={ref},
				type={type},
				value={value},
				defaultValue={undefined},
				name={undefined},
				autoComplete={undefined},
				autoFocus={undefined},
				id={undefined},
				title={undefined},
				docTitle={undefined},
				docLang={undefined},
				docDir='rtl',
				docLang='fa',
				docDir='rtl',
				docLang='fa',
				docDir='rtl',
				docLang='fa',
				docDir='rtl',
				docLang='fa',
				 ...rest }
);
});

export default Input;



import React from 'react';

interface InputProps {
	type?: string;
	placeholder?: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	disabled?: boolean;
	error?: boolean;
	className?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
({
	type = 'text',
	placeholder,
	value,
	onChange,
	disabled = false,
	error = false,
	className = '',
	...rest
}, ref) => {
	const baseClasses =
'w-full border-border rounded-md px-py text-base focus outline none focus ring primary';
	const errorClasses =
error ? 'border-danger ring-danger' : '';
	const combinedCls =
baseClasses + ' ' + errorClasses + ' ' + className;

return (
<input {...rest}
type={type}
placeholder={placeholder}
value={value}
onChange={onChange}
disabled={disabled}
ref={ref}
className={combinedCls}
/>
);
});

export default Input;
