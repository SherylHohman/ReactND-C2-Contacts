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

  // Lesson 3, Module 5: "Update State with SetState"
  removeContact = (contact) => {
    // takes in (the) contact that was clicked on (we'll access contact.id)
    // pass it a function.. that returns an object. See below for how syntax for this evolves
    // this.setState();             the bar function call
    // this.setState( () => () );   .. that's passed in a function
    // this.setState( () => ({}) ); .. that returns an object
    this.setState( (state) => ({
      // contacts is now a OBJECT on state.
      // We set "contacts: ..." to a new (array) as defined below (ie minus current contact)
      // state is the variable passed in.  Don't use this.state.contacts
      contacts: state.contacts.filter((contacts_old) => (
        // filter function is also being passed in a function hence the (()=>()) syntax
        // remove the contact that was clicked on
        contacts_old.id != contact.id
        // NO ; at the end of above line, its an Object (a , would be used if there was another key/value pair)
        // filter out the former contact that has an id of the contact which was clicked on (this contact is passed back to us from ListContacts OnClick function via "contact" that's passed into our removeContact function)
      ))
    }) );
  }

  render() {
    return (
      <div>
        <ListContacts onDeleteContact={this.removeContact} contacts={this.state.contacts}/>
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

// Notes for Lesson 3, Module 5: Update state with setState
  //  App component owns the contacts array
  //  create a method. removeContact, on App that modifies the contact array
  // it does this with the pattern of passing in a function which takes in state, and MODIFIES state.
  // it returns a new state variable with a new value for contacts
  // its new value is the original array of contacts, MINUS the contact that had the contact.id of the clicked on contact.
  // this new state variable is MERGED with the Previous value of the state variable (automatically by react).  This distinction of MERGING old state{} object with new state{} object is probably so we only need to include code for the parts were CHANGING, not list the current value of ALL (key/value pairs of) variables that are part of the defined state Object.

  // this removeContact method must be passed to ListContacts via props

  // How does it know what contact that is?
    //  

