import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../Styles/InformationCard.css";

function InformationCard({ title, description, icon }) {
  return (
    <div className="information-card">
      <div className="icon">
        <FontAwesomeIcon icon={icon} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default InformationCard;
