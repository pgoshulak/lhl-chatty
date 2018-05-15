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
  }
  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={ this.state.messages }/>
        <ChatBar currentUser={ this.state.currentUser }/>
      </div>
    );
  }
}
export default App;
