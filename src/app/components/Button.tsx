interface ButtonProps {
  text: string
  className?: string
  disabled?: boolean
}

export default function Button({
  text,
  disabled = false,
  className = '',
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      type="submit"
      className={`${className} rounded-[10px] bg-primary px-7 py-4 font-bold hover:bg-primary/55`}
    >
      {text}
    </button>
  )
}
