import React, { Component } from 'react';
import ListContacts from "./ListContacts.js";

// Temp contacts list, until we learn how to make network requests, using:
// - src/utils/ContactsAPI.js, our preconfigured contacts API
// - with our preconfigured Backend Server

// Lesson 3, Module 4: Managing State
// Let App manage state of contacts list (so can delete and add new)
//   by moving it inside App Component, as a field in its 'state' "field variable"

// const contacts = [
//   {
//     "id": "ryan",
//     "name": "Ryan Florence",
//     "email": "ryan@reacttraining.com",
//     "avatarURL": "http://localhost:5001/ryan.jpg"
//   },
//   {
//     "id": "michael",
//     "name": "Michael Jackson",
//     "email": "michael@reacttraining.com",
//     "avatarURL": "http://localhost:5001/michael.jpg"
//   },
//   {
//     "id": "tyler",
//     "name": "Tyler McGinnis",
//     "email": "tyler@reacttraining.com",
//     "avatarURL": "http://localhost:5001/tyler.jpg"
//   }
// ]

class App extends Component {

  state = {
    // const contacts = [
    contacts : [
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

  }

  render() {
    return (
      <div>
        <ListContacts contacts={this.state.contacts}/>
     </div>
    );
  }
}

export default App;


// Notes for Lesson 3, Module 4: Add State to a Component

// contacts array is now a "state" variable of the App Component
// App is now a Component with state instead of a Stateless Component.
// data that is passed to child components should be encapsulated by that component.  Previously, it was just a random variable inside App.js, but not owned by anyone.
// Notice that:
  //          <ListContacts contacts={contacts}/>
  // becomes :
  //\        <ListContacts contacts={this.state.contacts}/>
  // and that contacts is now a PROPERTY of the state OBJECT, not a plain variable (constant):
  //          const contacts = [
  // becomes
  //          contacts : [
  // within the state = {} object


