interface ButtonProps {
  text: string
  className?: string
}

export default function Button({ text, className = '' }: ButtonProps) {
  return (
    <button type="submit" className={`btn bg-primary ${className}`}>
      {text}
    </button>
  )
}
