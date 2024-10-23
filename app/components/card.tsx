interface CardProps {
  date: string;
  title: string;
  excerpt?: string;
  types: string;
  categories?: string;
  tags?: string;
  link?: string;
  thumb?: string;
}

export default function Card({
  date,
  title,
  excerpt,
  types,
  categories,
  tags,
  link,
  thumb,
}: CardProps) {
  const year = date.split("/")[2];
  const sanitizedExercept = excerpt
    ? excerpt.replace(/(\r\n|\n|\r)/gm, "")
    : "";
  const typesArray = types ? types.split(",").map((type) => type.trim()) : [];
  const tagsArray = tags
    ? tags
        .split(",")
        .map((tag) => tag.trim())
        .sort()
    : [];
  const categoriesArray = categories
    ? categories
        .split(",")
        .map((category) => category.trim())
        .sort()
    : [];
  return (
    <article className="card">
      {thumb && (
        <div className="image">
          <img src={`https://saraorsi.com/images/${thumb}`} alt={title} />
        </div>
      )}
      <div className="year">{year}</div>
      <div className="title">{title}</div>
      <div className="excerpt">
        <div>
          <div dangerouslySetInnerHTML={{ __html: sanitizedExercept || "" }} />
          {tagsArray && (
            <div className="tags">
              {tagsArray.map((item, i) => (
                <span key={i}>#{item}</span>
              ))}
            </div>
          )}
        </div>
        {link && (
          <div className="link">
            <a href={link} target="_blank">
              Visit the website
            </a>
          </div>
        )}
      </div>
      <div className="labels">
        {typesArray &&
          typesArray.map((item, i) => (
            <span className="type" key={i}>
              {item}
            </span>
          ))}
        {categoriesArray &&
          categoriesArray.map((item, i) => (
            <span className="category" key={i}>
              {item}
            </span>
          ))}
      </div>
    </article>
  );
}
