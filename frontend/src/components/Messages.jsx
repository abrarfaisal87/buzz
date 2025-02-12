import React from 'react'
import Message from './Message'
import useGetMessages from '../hooks/useGetMessages'
import useListenMessages from '../hooks/useListenMessages';
import useChatScroll from '../hooks/useChatScroll';

const Messages = () => {
  const { loading, messages } = useGetMessages();
  
  useListenMessages();

  const ref = useChatScroll(messages);
  return (
    <div className='px-4 flex-1 overflow-auto'>
        {messages.map((message) =>
              <Message key={message.id} message={message} ref={ref}/>
        )}

        {!loading && messages.length === 0 && (
          <p className='text-center text-white'>Start Your Conversation</p>
        )}
    </div>
  )
}

export default Messages