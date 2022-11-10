import "./FitnessSection.scss";
import fitnessPic from "../../../assets/fitness-main-pic.jpg";
import nike from "../../../assets/nike.jpeg";
const FitnessSection = () => {
    return (
        <div className="fitness-section-wrapper">
            <span className="fitness-motivation-text">
                Yesterday<br></br>
                you said<br></br>
                tomorrow<br></br>
                <span id="motivation-subtext">Just do it</span><br></br>
                <img id="nike-logo" src={nike} alt="nike" />
            </span>
            <div id="fitness-section-picture-wrapper">
                <img id="fitness-pic" src={fitnessPic} alt="fitness-pic" />
            </div>
        </div>
    )
}

export default FitnessSection;