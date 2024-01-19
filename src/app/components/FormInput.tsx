interface FormInputProps {
  placeholder: string;
  className?: string;
}

export default function FormInput({ placeholder, className = "" }: FormInputProps) {
  return (
    <input className={`h-[2.8125rem] rounded-[10px] bg-input p-4 placeholder:text-base-s placeholder:text-white ${className}`}
           placeholder={placeholder} />
  )
}
