import Link from "next/link";

function TextBoxRanking({name, content, school}) {
    if (content===null || content===undefined) {
        school1_answer = "Unavailable";
    }
    const school_profile_link = `/schools/${school}`
    return (
        <div className="textbox-ranking-item">
            <div className="textbox-ranking-title"> 
                <div style={{ fontSize: "16px"}}>
                    <Link href={school_profile_link} style={{ color: "black", borderBottom:"1px solid transparent", textDecoration:"none", fontWeight:"bold"}}
                    onMouseOver={(e)=>{e.target.style.borderBottom= "1px solid black"}}
                    onMouseLeave={(e)=>{e.target.style.borderBottom= "1px solid transparent"}}>{name}</Link>
                </div>
            </div>
            <div className="textbox-ranking-body">
                    {` ${content}`}
            </div>
        </div>
    )
}
export default TextBoxRanking;