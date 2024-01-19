interface ButtonProps {
  text: string;
  className?: string;
}

export default function Button({ text, className = "" }: ButtonProps) {
  return (
    <button className={`btn ${className}`}>{text}</button>
  )
}
