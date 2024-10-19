interface CardProps {
  date: string;
  title: string;
  exercept?: string;
  type: string;
  categories?: string;
  tags?: string;
  link?: string;
}

export default function Card({
  date,
  title,
  exercept,
  type,
  categories,
  tags,
  link,
}: CardProps) {
  return (
    <article>
      <div>{date}</div>
      <div>{title}</div>
      <div>{exercept}</div>
      <div>{type}</div>
      <div>{categories}</div>
      <div>{tags}</div>
      <div>{link}</div>
    </article>
  );
}
