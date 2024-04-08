import Link from "next/link";

const SchoolButton = ({ link, text = "Go to School Profile", onClick }) => {
  return onClick ? (
    <button className="btn btn-primary" onClick={onClick}>
      {text}
    </button>
  ) : link ? (
    <Link href={link}>
      <button className="btn btn-primary">{text}</button>
    </Link>
  ) : (
    <button className="btn btn-primary" disabled>
      {text}
    </button>
  );
};

export default SchoolButton;
