import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ message }) => {
  const { type, content, username, color } = message
  const style = {
    color: color
  }
  return (
    type === 'incomingNotification'
      /* Notification, eg. username changes */
      ? <div className="message system">{content}</div>
      /* Chat message */
      : (
        <div className='message'>
          <span className="message-username" style={style}>{username}</span>
          <span className="message-content">{content}</span>
        </div>
      )
  )
}

Message.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.any,
    type: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    username: PropTypes.string,
    color: PropTypes.string
  })
}

export default Message;