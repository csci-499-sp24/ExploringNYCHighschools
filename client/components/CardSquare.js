// Component for flex box on SchoolProfile page that displays the information after contact info
const CardSquare = ({ text1, text2 }) => {
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