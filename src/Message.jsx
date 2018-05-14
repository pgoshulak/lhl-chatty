import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const { type, content, username } = this.props.messageData
    return (
      type === 'incomingNotification'
        ? <div className="message system">{content}</div>
        : (
          <div className='message'>
            <span className="message-username">{username}</span>
            <span className="message-content">{content}</span>
          </div>
        )
    )
  }
}

Message.propTypes = {
  messageData: PropTypes.object.shape({
    type: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    username: PropTypes.string,
  })
}

export default Message;