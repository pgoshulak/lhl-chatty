import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import OnlineUserCount from './OnlineUserCount.jsx'

const SOCKET_ADDRESS = 'ws://localhost:3001'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: {
        username: 'Anonymous'
      },
      messages: [],
      onlineUsers: 0
    }
    this.sendNewMessage = this.sendNewMessage.bind(this);
    this.handleUserNameChange = this.handleUserNameChange.bind(this)
    this.handleMessageKeyPress = this.handleMessageKeyPress.bind(this)
    this.onMessageReceive = this.onMessageReceive.bind(this);
  }

  handleUserNameChange(event) {
    // Set new user name from input (blank input defaults to 'Anonymous')
    const newUserName = event.target.value || 'Anonymous'
    this.setState({ currentUser: {username: newUserName} })

    // Send notification to server
    this.sendNewMessage({
      type: 'postNotification',
      content: `${this.state.currentUser.username} changed their name to ${newUserName}`
    })
  }

  handleMessageKeyPress(event) {
    if (event.key === 'Enter') {
      // Send message to server
      this.sendNewMessage({
        username: this.state.currentUser.username,
        type: 'postMessage',
        content: event.target.value
      })
      // Clear the message input field
      event.target.value = ''
    }
  }

  sendNewMessage(newMessage) {
    this.socket.send(JSON.stringify(newMessage))
  }

  onMessageReceive(event) {
    const message = JSON.parse(event.data);
    // Check if updating number of online users
    if (message.type === 'onlineUserCount') {
      this.setState({ onlineUsers: message.content })
    } else {
      // If not an 'update user count' message, add it to the message list
      const messages = [...this.state.messages, message]
      this.setState({ messages })
    }
  }

  componentDidMount() {
    this.socket = new WebSocket(SOCKET_ADDRESS)
    this.socket.onmessage = this.onMessageReceive
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <OnlineUserCount count={ this.state.onlineUsers } />
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
