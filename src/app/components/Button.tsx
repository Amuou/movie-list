interface ButtonProps {
  text: string
  className?: string
}

export default function Button({ text, className = '' }: ButtonProps) {
  return (
    <button
      type="submit"
      className={`rounded-[10px] bg-primary px-7 py-4 ${className}`}
    >
      {text}
    </button>
  )
}
