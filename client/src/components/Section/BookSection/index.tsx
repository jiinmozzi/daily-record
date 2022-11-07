import bookAdventure from "../../../assets/bookAdventure.jpeg";

import "./BookSection.scss";

const BookSection = () => {
    return (
        <div className="book-section-wrapper">
            <img className="book-adventure" src={bookAdventure} alt="book-main" />
        </div>
    )
}

export default BookSection;