function TextBoxRanking({name, content}) {
    if (content===null || content===undefined) {
        school1_answer = "Unavailable";
    }
    return (
        <div className="textbox-ranking-item">
            <div className="textbox-ranking-title"> 
                <div style={{ fontSize: "18px"}}>{name}</div>
            </div>
            <div className="textbox-ranking-body">
                    {` ${content}`}
            </div>
        </div>
    )
}
export default TextBoxRanking;