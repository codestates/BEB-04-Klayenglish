import React from "react";
import onlineIcon from "client/public/onlineIcon.png";
import closeIcon from "client/public/closeIcon.png";

import onlineIcon from "../../../public/onlineIcon.png";
import closeIcon from "../../../public/closeIcon.png";

import "./InfoBar.css";

const InfoBar = () => {
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} alt="online icon" />
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
      <a href="/">
        <img src={closeIcon} alt="close icon" />
      </a>
    </div>
  </div>;
};

export default InfoBar;
