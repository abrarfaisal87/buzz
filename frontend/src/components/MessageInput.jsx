import  { useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../hooks/useSendMessage";

const MessageInput = () => {
  const [message,setMessage] = useState("");

  const {loading,sendMessage} = useSendMessage();

  const handleSubmit = async (e)=>{
     e.preventDefault()
     if(!message.trim) return;
     await sendMessage(message);
     setMessage("");
  }


  return (
    <>
      <form className="p-2"  onSubmit={handleSubmit}>
        <div className="w-full flex items-center relative ">
          <input
            type="text"
            className="border w-full text-sm rounded-lg p-2 bg-slate-700 text-white border-slate-700"
            placeholder="Send message"
            value={message}
            onChange={(e)=>setMessage(e.target.value)}
          />
          <button type="submit" className="text-white absolute inset-y-0 pe-3 end-0">
            {loading ? (
              <span className="loading loading-spinner" />
            ) : (
              <IoSend/>
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default MessageInput;
