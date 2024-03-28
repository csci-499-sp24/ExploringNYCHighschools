// Component for flex box on SchoolProfile page that displays the information after contact info
const CardSquare = ({ text1, text2 }) => {
    // checks if text2 was a field in the data json. If not, the type would be an object from school quality reports and undefined from hs directory.
    if (typeof(text2)==='object' || typeof(text2)==='undefined') {
        text2="Unavailable"
    }
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{text1}</h5>
                <p className="card-text">{text2}</p>
            </div>
        </div> 
    )
  };

export default CardSquare;