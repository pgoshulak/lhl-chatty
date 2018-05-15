import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: this.props.currentUser.name || 'Anonymous'
    }
    this.handleUserNameChange = this.handleUserNameChange.bind(this)
    this.handleMessageKeyPress = this.handleMessageKeyPress.bind(this)
  }
  
  handleUserNameChange(event) {
    const newUserName = event.target.value
    this.props.addNewMessage({
      type: 'incomingNotification',
      content: `${this.state.username} changed their name to ${newUserName}`
    })
    this.setState({username: newUserName})
  }
  
  handleMessageKeyPress(event) {
    if (event.key === 'Enter') {
      this.props.addNewMessage({
        username: this.state.username,
        type: 'incomingMessage',
        content: event.target.value
      })
      // Clear the form input field
      event.target.value = ''
    }
  }

  render() { 
    return ( 
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder="Your Name (Optional)" 
          onBlur={ this.handleUserNameChange }
        />
        <input 
          className="chatbar-message"
          placeholder="Type a message and hit ENTER" 
          onKeyPress={ this.handleMessageKeyPress }
        />
      </footer>
      );
  }
}
 
ChatBar.propTypes = {
  currentUser: PropTypes.any,
  addNewMessage: PropTypes.func
}

export default ChatBar;