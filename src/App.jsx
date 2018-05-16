import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

import sampleMessages from './sampleMessages.json'

const SOCKET_ADDRESS = 'ws://localhost:3001'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: {
        username: 'Anonymous'
      },
      messages: sampleMessages.messages
    }
    this.sendNewMessage = this.sendNewMessage.bind(this);
    this.handleUserNameChange = this.handleUserNameChange.bind(this)
    this.handleMessageKeyPress = this.handleMessageKeyPress.bind(this)
  }

  handleUserNameChange(event) {
    // Set new user name from input (blank input defaults to 'Anonymous')
    const newUserName = event.target.value || 'Anonymous'
    this.setState({ currentUser: {username: newUserName} })

    // Send notification to server
    this.sendNewMessage({
      type: 'incomingNotification',
      content: `${this.state.currentUser.username} changed their name to ${newUserName}`
    })
  }

  handleMessageKeyPress(event) {
    if (event.key === 'Enter') {
      // Send message to server
      this.sendNewMessage({
        username: this.state.currentUser.username,
        type: 'incomingMessage',
        content: event.target.value
      })
      // Clear the message input field
      event.target.value = ''
    }
  }

  sendNewMessage(newMessage) {
    // Generate message id from array length (0-based ids)
    const id = this.state.messages.length;
    // Add new message + id to existing messages list
    const newMessages = this.state.messages.concat({ ...newMessage, id })
    // Set component state to new messages list
    this.setState({ messages: newMessages })
    this.socket.send(JSON.stringify(newMessage))
  }

  componentDidMount() {
    this.socket = new WebSocket(SOCKET_ADDRESS)
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar
          handleUserNameChange={this.handleUserNameChange}
          handleMessageKeyPress={this.handleMessageKeyPress}
        />
      </div>
    );
  }
}
export default App;
