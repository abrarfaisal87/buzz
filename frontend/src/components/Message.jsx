import React from "react";

import useConversation from "../Zustand/useConversation";
import {extractTime} from '../utils/extractTime.js'
import { useAuthContext } from "../context/AuthContext.jsx";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();


  const fromMe = message?.senderId === authUser?.id;
  const chatClass = fromMe ? "chat-end" : "chat-start";
  const img = fromMe ? authUser?.profilePic : selectedConversation.profilePic;


  const bubbleBg = fromMe ? "bg-blue-900" : "";

  return (
    <>
      <div className={`chat ${chatClass}`}>
        <div className="hidden md:block chat-image avatar">
          <div className="w-6 md:w-10 rounded-full">
            <img alt="Tailwind CSS chat bubble component" src={img} />
          </div>
        </div>
        <div className="chat-header ">
         
          <time className="text-xs opacity-50">{extractTime(message.createdAt)}</time>
        </div>
        <div
          className={`chat-bubble text-white ${bubbleBg} text-sm md:text-md`}
        >
          {message.body}
        </div>
        
      </div>
    </>
  );
};

export default Message;
