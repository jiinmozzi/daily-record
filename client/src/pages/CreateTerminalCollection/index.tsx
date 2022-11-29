import TerminalCollectionForm from "../../components/FormTemplate/TerminalCollectionForm";
import TerminalMainSection from "../../components/Section/TerminalMainSection";

import "./CreateTerminalCollection.scss";
const CreateTerminalCollection = () => {
    return (
        <div className="create-terminal-collection-wrapper">
            <TerminalMainSection />
            <TerminalCollectionForm  />
        </div>
    )
}

export default CreateTerminalCollection;