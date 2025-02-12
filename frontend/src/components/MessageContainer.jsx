import React from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { TiMessage } from "react-icons/ti";
import useConversation from "../Zustand/useConversation";
import { useAuthContext } from "../context/AuthContext";

const MessageContainer = () => {
  const notChatSelected = false;
  const { selectedConversation } = useConversation();
  return (
    <>
      <div className="md:min-w-[450px] flex flex-col">
        {/* header */}
        {!selectedConversation ? (
          <NochatSelected />
        ) : (
          <>
            <div className="bg-slate-400 px-2 py-3 mb-2">
              <span className="text-white label-text">
                To:
                <span className="rounded-full p-2 bg-slate-600 text-white font-bold text-sm">
                  {selectedConversation.fullname}
                </span>
              </span>
            </div>
            <Messages />
            <MessageInput />
          </>
        )}
      </div>
    </>
  );
};

const NochatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <>
      <div className="flex items-center justify-center w-full h-full">
        <div className="px-4 flex flex-col sm:text-lg md:text-xl text-gray-200 font-semibold text-center gap-2 items-center">
          <p>Welcome {authUser?authUser?.fullname : "user"}</p>
          <p>Select a chat for messaging</p>
          <TiMessage className="text-3xl md:text-6xl" />
        </div>
      </div>
    </>
  );
};
export default MessageContainer;
