import { ImNewTab } from "react-icons/im";
import Favorite from "./Favorite";

const Card = ({data, showImg=false, showHeart=false}) => {

    if(!data?.address) {
        data = { ...data, address: "Unavailable"};
    }
    if(!data?.phone_number) {
        data = { ...data, phone_number: "Unavailable"};
    }
    if(!data?.email) {
        data = { ...data, email: "Unavailable"};
    }
    if(data?.website) {
        if(!data?.website.startsWith("http")) {
          data = { ...data, website: "https://"+data.website};
        }
    }
   
    return (
        <div className="card-fill">
            <div className="card-body">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div>
                        <h6 className="card-title">
                            <span className="card-title-span"> School Name: </span> {data?.school_name}
                        </h6>

                        <h6 className="card-title">
                            <span className="card-title-span">Address: </span> {data?.address}
                        </h6>
                        {data?.website ? ( 
                            <h6 className="card-title">
                            <span className="card-title-span">Website: </span>
                                <a
                                href={data?.website}
                                style={{ color: "black", borderBottom: "1px solid transparent", textDecoration: "none" }}
                                onMouseOver={(e) => { e.target.style.borderBottom = "1px solid black"; }}
                                onMouseLeave={(e) => { e.target.style.borderBottom = "1px solid transparent"; }}
                                target="_blank"
                                >
                                {data?.website}
                                </a>
                                <ImNewTab />
                            </h6>
                            ) : (
                                <h6 className="card-title">
                                <span className="card-title-span">Website: Unavailable</span>
                                </h6>
                                )
                        }
                        <h6 className="card-title">
                            <span className="card-title-span">Phone Number: </span> {data?.phone_number}
                        </h6>

                        <h6 className="card-title">
                            <span className="card-title-span"> Email: </span> {data?.email}
                        </h6>
                        <h6 className="card-title">
                        </h6>
                    </div>
                    {data?.imgUrl && showImg && <img src={data.imgUrl} style={{ width: "240px", height: "190px",marginLeft: "20px", objectFit: "contain", marginRight:"20px"}} />}
                    <div className="fav-map">
                        {showHeart &&
                            <Favorite data={data}/>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
  };
export default Card;