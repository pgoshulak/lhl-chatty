import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

import sampleMessages from './sampleMessages.json'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: {},
      messages: sampleMessages.messages
    }
    this.addNewMessage = this.addNewMessage.bind(this);
  }

  addNewMessage(newMessage) {
    // Generate message id from array length (0-based ids)
    const id = this.state.messages.length;
    // Add new message + id to existing messages list
    const newMessages = this.state.messages.concat({...newMessage, id})
    // Set component state to new messages list
    this.setState({messages: newMessages})
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={ this.state.messages }/>
        <ChatBar currentUser={ this.state.currentUser } addNewMessage={ this.addNewMessage }/>
      </div>
    );
  }
}
export default App;
