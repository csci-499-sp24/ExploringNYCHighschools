import Link from "next/link";

const SchoolButton = ({ link, text="Go to School Profile"}) => {
    return (
        <Link href={link}>
            <button className="btn btn-primary">{text}</button>
        </Link>
    )
  };
  
  export default SchoolButton;