import { useNavigate } from "react-router-dom";

import "../../assets/404.jpg"
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import "./notFound.scss";
const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className="not-found-wrapper">
            <div className="not-found-background">
                <div className="not-found-nav" onClick={() => navigate('/')}>Return Home</div>
            </div>
        </div>
    )
}
export default NotFound;