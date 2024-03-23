import { FaArrowUp } from "react-icons/fa"

const ScrollUpButton = ({}) => {    
    const ScrollUpFunction = () => {
        window.scrollTo({
        top: 0,
        behavior: "smooth",
        });
    }
    return (
        <button onClick={ScrollUpFunction} className="scroll-button">
            <FaArrowUp/>
        </button>
    )
}

export default ScrollUpButton;
