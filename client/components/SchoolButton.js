import Link from "next/link";

const SchoolButton = ({ link }) => {
    return (
        <Link href={link}>
            <button className="btn btn-primary">Go to School Profile</button>
        </Link>
    )
  };
  
  export default SchoolButton;