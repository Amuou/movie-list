import clsx from 'clsx'

interface FormInputProps {
  placeholder: string
  id?: string
  type?: string
  name?: string
  className?: string
}

export default function FormInput({
  type,
  id,
  name,
  placeholder,
  className = '',
}: FormInputProps) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      className={clsx(
        'h-[2.8125rem]',
        'rounded-[10px]',
        'border-0',
        'focus:ring-input',
        'focus:ring-1',
        'bg-input',
        'p-[0.65rem]',
        'placeholder:text-base-s',
        'placeholder:text-white',
        'focus:placeholder:text-transparent',
        className,
      )}
      placeholder={placeholder}
    />
  )
}
