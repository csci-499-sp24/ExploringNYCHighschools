import { ImNewTab } from "react-icons/im";

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

                    
                        <h6 className="card-title">
                            <span className="card-title-span">Phone Number: </span> {data?.phone_number}
                        </h6>

                        <h6 className="card-title">
                            <span className="card-title-span"> Email: </span> {data?.email}
                        </h6>
                        <h6 className="card-title">
                        </h6>
                    </div>
                    {data?.imgUrl && <img src={data.imgUrl} style={{ width: '200px', height: '150px', marginLeft: '20px' }} />}
                </div>
            </div>
        </div>
    )
  };
export default Card;