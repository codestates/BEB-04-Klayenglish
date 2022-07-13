import { type } from "os";
import React from "react";

// import onlineIcon from "../../icons/onlineIcon.png";
// 사진경로 오류...  => 수정필요

import "./TextContainer.css";

type UserProps = {
  users: any;
};
type mapProps = {
  name: any;
};
// type UserName = {
//   [p in keyof UserProps]?: UserProps[p];
// };

const TextContainer: React.FC<UserProps> = ({ users }) => (
  <div className="textContainer">
    <div>
      <h1>
        실시간 채팅 프로그램{" "}
        <span role="img" aria-label="emoji">
          💬
        </span>
      </h1>
      <h2>
        Created with React, Express, Node and Socket.IO{" "}
        <span role="img" aria-label="emoji">
          ❤️
        </span>
      </h2>
      <h2>
        Try it out right now!{" "}
        <span role="img" aria-label="emoji">
          ⬅️
        </span>
      </h2>
    </div>
    {users ? (
      <div>
        <h1>현재 채팅중인 사람들 : </h1>
        <div className="activeContainer">
          <h2>
            {users.map(({ name }: mapProps) => (
              <div key={name} className="activeItem">
                {name}
                {/* <img alt="Online Icon" src={onlineIcon} /> */}
              </div>
            ))}
          </h2>
        </div>
      </div>
    ) : null}
  </div>
);

export default TextContainer;
