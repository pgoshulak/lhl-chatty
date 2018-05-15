import React from 'react';
import Message from './Message.jsx';
import PropTypes from 'prop-types';

const MessageList = ({ messages }) => {
  return (
    <main className='messages'>
      { messages.map(message => 
        (<Message key={message.id} message={message} />)
      ) }
    </main> 
  )
}

 
MessageList.propTypes = {
  messages: PropTypes.array
}

export default MessageList;