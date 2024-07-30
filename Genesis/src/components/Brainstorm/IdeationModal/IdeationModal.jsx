import React, { useState } from "react";
import "./IdeationModal.css";
import close_icon from "../../../assets/png/close.png";
import brainstorm_ideation from "../../../assets/png/brainstorm_ideation.png";
import IdeationProject from "./IdeationProject/IdeationProject";
import IdeationFeature from "./IdeationFeature/IdeationFeature";
import AddIdea from "./AddIdea/AddIdea";

const IdeationModal = ({ closeModal }) => {
	const [modalSelect, setModalSelect] = useState(null);

	const handleButtonClick = (modalType) => {
		setModalSelect(modalType);
	};

	const renderModalContent = () => {
		switch (modalSelect) {
			case "project":
				return <IdeationProject closeModal={() => setModalSelect(null)} />;
			case "feature":
				return <IdeationFeature closeModal={() => setModalSelect(null)} />;
			case "addIdea":
				return <AddIdea closeModal={() => setModalSelect(null)} />;
			default:
				return (
					<>
						<div className="ideation-modal">
							<div className="ideation-modal-header">
								<span className="ideation-user-welcome">
									Welcome, <b>Username.</b>
								</span>
								<img src={close_icon} alt="close icon" onClick={closeModal} />
							</div>
							<hr />
							<p>
								At Genesis, we can help you find project ideas or assist you
								with providing new project features. What are you looking for?
							</p>
							<img src={brainstorm_ideation} alt="Ideation graphic" />
							<div className="ideation-button-container">
								<button onClick={() => handleButtonClick("project")}>
									I'm looking to generate new project ideas
								</button>
								<button onClick={() => handleButtonClick("feature")}>
									I'm looking to generate new project features
								</button>
								<button onClick={() => handleButtonClick("addIdea")}>
									I would like to add a project idea to my idea list
								</button>
							</div>
						</div>
					</>
				);
		}
	};

	return <div className="modal">{renderModalContent()}</div>;
};

export default IdeationModal;
