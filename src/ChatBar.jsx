import React from 'react';
import PropTypes from 'prop-types';

const ChatBar = ({ handleMessageKeyPress, handleUserNameChange }) => {
  return ( 
    <footer className="chatbar">
      {/* Username input, triggers handler on lose-focus (ie. onBlur()) */}
      <input
        className="chatbar-username"
        placeholder="Your Name (Optional)" 
        onBlur={ handleUserNameChange }
      />
      {/* Message input, triggers handler on every keypress */}
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