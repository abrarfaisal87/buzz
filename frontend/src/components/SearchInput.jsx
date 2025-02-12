import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";
import useConversation from "../Zustand/useConversation";
import useGetConversations from '../hooks/useGetConversations';


const SearchInput = () => {
  const [search,setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();
  
  const handleSubmit = (e)=>{
    e.preventDefault();
    if(!search) return;
    if(search.length < 3){
      return toast.error("more than 3 characters needed for search user");
    }

    const conversation = conversations.find((c)=>
      c.fullname?.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation){ 
      setSelectedConversation(conversation);
      setSearch("")
    }else{
      return toast.error("No such user found!")
    }
  }

  return (
    <>
      <form className="flex items-center  gap-2" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search"
          className="p-1 md:p-3 w-full text-sm md:text-lg   rounded-full text-white outline-none bg-slate-500"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />
        <button className="btn md:btn-md btn-sm btn-circle border-slate-500 bg-slate-500 text-white">
          <FaSearch className="w-3 h-3 outline-none"/>
        </button>
      </form>
    </>
  );
};

export default SearchInput;
