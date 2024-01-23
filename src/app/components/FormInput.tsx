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
      className={`h-[2.8125rem] rounded-[10px] bg-input p-4 placeholder:text-base-s placeholder:text-white ${className}`}
      placeholder={placeholder}
    />
  )
}
