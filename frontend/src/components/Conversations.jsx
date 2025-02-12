import React from 'react'
import Conversation from './Conversation'
import useGetConversations from '../hooks/useGetConversations'

const Conversations = () => {

  const {conversations,loading} = useGetConversations();
  return (
    <div className='flex flex-col gap-1  overflow-auto'>
      {conversations.map((conversation)=>(
        <Conversation key={conversation.id} conversation={conversation}/>
      ))}
    {loading? <span className='loading loading-spinner mx-auto'/>:null}
    </div>
  )
}

export default Conversations