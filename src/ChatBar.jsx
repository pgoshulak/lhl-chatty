import React from 'react';
import PropTypes from 'prop-types';

const ChatBar = ({ handleMessageKeyPress, handleUserNameChange }) => {
  return ( 
    <footer className="chatbar">
      <input
        className="chatbar-username"
        placeholder="Your Name (Optional)" 
        onBlur={ handleUserNameChange }
      />
      <input 
        className="chatbar-message"
        placeholder="Type a message and hit ENTER" 
        onKeyPress={ handleMessageKeyPress }
      />
    </footer>
    );
}

 
ChatBar.propTypes = {
  handleMessageKeyPress: PropTypes.func,
  handleUserNameChange: PropTypes.func
}

export default ChatBar;