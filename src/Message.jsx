import React from 'react';
import PropTypes from 'prop-types';

const ImageContent = ({imgUrl}) => {
  // Return blank for no image
  if (!imgUrl) {
    return null
  } else {
    const containerStyle = {
      maxWidth: '60vw'
    };
    const imgStyle = {
      maxWidth: '100%',
      display: 'block'
    }
    return (
      <div style={containerStyle}>
        <img src={imgUrl} style={imgStyle} alt="Image"/>
      </div>
    )
  }
}

const Message = ({ message }) => {
  const { type, content, username, color } = message
  const style = {
    color: color
  }
  // Extract image URL and convert to <ImageContent/>
  let imgUrl = null;
  let formattedContent = content;
  const imageUrlRegex = RegExp(/.*(https?\:\/\/\S+\.(jpg|jpeg|png|gif)).*/, 'g');
  const match = imageUrlRegex.exec(content)
  if (match) {
    // Save the url itself
    imgUrl = match[1]
    // Remove the image url from the message itself
    formattedContent = formattedContent.replace(imgUrl, '')
  }

  return (
    type === 'incomingNotification'
      /* Notification, eg. username changes */
      ? <div className="message system">{content}</div>
      /* Chat message */
      : (
        <div className='message'>
          <span className="message-username" style={style}>{username}</span>
          <span className="message-content">
            {formattedContent}
            <ImageContent imgUrl={imgUrl}/>
          </span>
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

ImageContent.propTypes = {
  imgUrl: PropTypes.string
}

export default Message;