import React from "react";

import ScrollToBottom from "react-scroll-to-bottom";

import Message from "./Message/Message";

import "./Messages.css";

// interface Props {
//   name: any;
//   messages: any;
//   message: any;
// }
// type MessageProps = {
//   message: any;
//   i: any;
// };
// map 파라미터 타입설정못함

const Messages = ({ messages, name }: { messages: any; name: any }) => (
  <ScrollToBottom className="messages">
    {messages.map((message, i) => (
      <div key={i}>
        <Message message={message} name={name} />
      </div>
    ))}
  </ScrollToBottom>
);

export default Messages;
