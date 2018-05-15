import React, { Component } from 'react';
import Message from './Message.jsx';
import PropTypes from 'prop-types';

class MessageList extends Component {
  render() { 
    let messages = this.props.messages.map(message => (<Message key={message.id} messageData={message} />));
    return (
      <main className='messages'>
        { messages }
      </main> 
    )
  }
}
 
MessageList.propTypes = {
  messages: PropTypes.array
}

export default MessageList;