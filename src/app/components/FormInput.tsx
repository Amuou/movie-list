import clsx from 'clsx'

interface FormInputProps {
  placeholder: string
  id?: string
  type?: string
  name?: string
  errors?: string[]
  className?: string
}

export default function FormInput({
  type,
  id,
  name,
  placeholder,
  errors,
  className = '',
}: FormInputProps) {
  let inputClassName = clsx(
    'h-[2.8125rem]',
    'rounded-[10px]',
    'autofill:bg-input',
    'border-0',
    'focus:ring-input',
    'focus:ring-1',
    errors && 'border-[1px]',
    errors && 'border-error',
    'bg-input',
    'w-full',
    'p-[0.65rem]',
    'placeholder:text-base-s',
    'placeholder:text-white',
    'focus:placeholder:text-transparent',
    'focus:bg-input/55',
  )

  return (
    <div className={`${className} relative flex w-full flex-col`}>
      <input
        id={id}
        name={name}
        type={type}
        className={inputClassName}
        placeholder={placeholder}
      />
      {errors &&
        errors.map((error) => (
          <span
            className="absolute -bottom-6 my-0 text-base-xs text-error"
            key={error}
          >
            {error}
          </span>
        ))}
    </div>
  )
}
