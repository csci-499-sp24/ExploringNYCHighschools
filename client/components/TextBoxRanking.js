import Link from "next/link";
import Favorite from "./Favorite";

function TextBoxRanking({name, content, school, allData}) {
    if (content===null || content===undefined) {
        school1_answer = "Unavailable";
    }
    const school_profile_link = `/schools/${school}`
    return (
        <div className="textbox-ranking-item">
            <div className="textbox-ranking-title"> 
                <div style={{ fontSize: "16px",display:"flex", alignItems:"center"}}>
                    <Link href={school_profile_link} style={{ color: "black", borderBottom:"1px solid transparent", textDecoration:"none", fontWeight:"bold", marginRight:"5px"}}
                    onMouseOver={(e)=>{e.target.style.borderBottom= "1px solid black"}}
                    onMouseLeave={(e)=>{e.target.style.borderBottom= "1px solid transparent"}}>{name}</Link>
                    <Favorite data={allData}/>
                </div>
            </div>
            <div className="textbox-ranking-body">
                    {` ${content}`}
            </div>
        </div>
    )
}
export default TextBoxRanking;