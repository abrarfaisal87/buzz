import React from "react";
import Sidebar from "../components/Sidebar";
import MessageContainer from "../components/MessageContainer";

const Home = () => {
  return (
    <div className="flex sm:h-[450px] rounded-lg overflow-hidden bg-gray-600 
    bg-clip-padding ">
      <Sidebar/>
      <MessageContainer/>
    </div>
  );
};

export default Home;
