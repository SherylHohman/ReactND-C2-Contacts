import React, { Component } from 'react';

// Temp contacts list, until we learn how to make network requests, using:
// - src/utils/ContactsAPI.js, our preconfigured contacts API
// - with our preconfigured Backend Server
const contacts = [
  {
    "id": "ryan",
    "name": "Ryan Florence",
    "email": "ryan@reacttraining.com",
    "avatarURL": "http://localhost:5001/ryan.jpg"
  },
  {
    "id": "michael",
    "name": "Michael Jackson",
    "email": "michael@reacttraining.com",
    "avatarURL": "http://localhost:5001/michael.jpg"
  },
  {
    "id": "tyler",
    "name": "Tyler McGinnis",
    "email": "tyler@reacttraining.com",
    "avatarURL": "http://localhost:5001/tyler.jpg"
  }
]

class App extends Component {
  render() {
    return (
      <div>
        Hello World
     </div>
    );
  }
}

export default App;
