
const Card = ({ text1, text2, text3, text4 }) => {
    if (typeof(text1)==='object') {
        text1="Unavailable"
    }
    if (typeof(text2)==='object') {
        text2="Unavailable"
    }
    if (typeof(text3)==='object') {
        text3="Unavailable"
    }
    if (typeof(text4)==='object') {
        text4="Unavailable"
    }
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