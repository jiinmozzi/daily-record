import bookAdventure from "../../../assets/bookAdventure.jpeg";
import book1 from "../../../assets/book1.jpeg";
import book2 from "../../../assets/book2.jpeg";
import book3 from "../../../assets/book3.jpeg";
import book4 from "../../../assets/book4.jpeg";
import book5 from "../../../assets/book5.jpg";
import book6 from "../../../assets/book6.jpg";
import book7 from "../../../assets/book7.jpeg";
import book8 from "../../../assets/book8.jpg";
import book9 from "../../../assets/book9.jpeg";
import "./BookSection.scss";

const BookSection = () => {
    return (
        <div className="book-section-wrapper">
            <div id="popular-book">
                <span id="hot-book">가장 HOT한 책</span>
                <img id="popular-book-image" src={book1} alt="노르웨이의 숲" />
            </div>
            <div id="book-recommendation">
                <img className="recommended-book odd" src={book2} alt="" />
                <img className="recommended-book even" src={book3} alt="" />
                <img className="recommended-book odd" src={book4} alt="" />
                <img className="recommended-book even" src={book5} alt="" />
                <img className="recommended-book odd" src={book6} alt="" />
                <img className="recommended-book even" src={book7} alt="" />
                <img className="recommended-book odd" src={book8} alt="" />
                <img className="recommended-book even" src={book9} alt="" />
            </div>
            {/* <img className="book-adventure" src={bookAdventure} alt="book-main" /> */}
        </div>
    )
}

export default BookSection;