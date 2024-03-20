
const Card = ({ text1, text2, text3, text4 }) => {
    return (
        <div className="card-fill">
            <div className="card-body">
                <h6 className="card-title">{text1}</h6>
                <h6 className="card-title">{text2}</h6>
                <h6 className="card-title">{text3}</h6>
                <h6 className="card-title">{text4}</h6>
            </div>
        </div>
    )
  };

export default Card;