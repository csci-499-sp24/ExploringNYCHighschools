
const Card = ({data }) => {
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
              
                <h6 className="card-title">
                    <span className="card-title-span"> School Name: </span> {data?.school_name}
                </h6>

                <h6 className="card-title">
                    <span className="card-title-span">Address: </span> {data?.address}
                </h6>

               
                <h6 className="card-title">
                    <span className="card-title-span">Website: </span> {data?.website}
                </h6>

               
                <h6 className="card-title">
                    <span className="card-title-span">Phone Number: </span> {data?.phone_number}
                </h6>

                <h6 className="card-title">
                    <span className="card-title-span"> Email: </span> {data?.email}
                </h6>
            </div>
        </div>
    )
  };
export default Card;