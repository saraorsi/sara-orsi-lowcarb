interface CardProps {
  title: string;
}

export default function Card({ title }: CardProps) {
  return <article>{title}</article>;
}
