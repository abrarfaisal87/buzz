import React, { useEffect, useState } from 'react'
import { useSocketContext } from '../context/socketContext'
import useConversation from '../Zustand/useConversation';
import notificationSound from '../assets/sounds/notification.mp3'

const useListenMessages = () => {
 const {socket} = useSocketContext();
 const {messages,setMessages} = useConversation();

 useEffect(()=>{
    socket?.on("newMessage",(newMessage)=>{
        const sound = new Audio(notificationSound)
        sound.play();
        setMessages([...messages,newMessage])
    });
 },[socket,messages,setMessages])
 
 return () => {
    socket?.off("newMessage");
 }
}

export default useListenMessages;