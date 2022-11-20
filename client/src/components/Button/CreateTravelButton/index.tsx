import React, {useState, useEffect} from "react";
import "./CreateTravelButton.scss";
const CreateTravelButton = () => {
    const [showCreateTravelModal, setShowCraeteTravelModal] = useState<boolean>(false);
    const createTravel = (e : React.MouseEvent) => {
        e.preventDefault();
        setShowCraeteTravelModal(true);
    }
    return (
        <button className="create-travel-button-wrapper" onClick={createTravel}>
            여행 스토리 추가하기
        </button>
    )
}

export default CreateTravelButton;