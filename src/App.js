import React, { Component } from 'react';
import ListContacts from "./ListContacts.js";
import * as ContactsAPI from "./utils/ContactsAPI.js";

class App extends Component {

  state = {
    // contacts will now be fetched from DB via ContactsAPI
    // L4 Module2: ComponentDidMountLifecycleEvent
    contacts : []
  }

  componentDidMount() {

    //componentDidMount() gets called after the
    // component is rendered AKA "mounted"

    // getAll returns a Promise, so call .then on it.
    // the .then function is going to be invoked with our contacts
    //  (see API - it gives us data.contacts from the AJAX call)
    // now out .then function will call setState, giving it our contacts property
    // NOTE ES6 syntax: { contaacts }
    // is equivalent to { contacts: contacts}

    ContactsAPI.getAll().then((contacts) => {
      this.setState({ contacts }) ;          // ES6 syntax
   // this.setState({ contacts: contacts});  // ES5 syntax
    })
  }

  removeContact = (contact) => {
    this.setState( (prevState) => ({
      contacts: prevState.contacts.filter((contacts_old) => (
        contacts_old.id !== contact.id
      ))
    }) );

    // now, remove the deleted contact from backend database, using API
    ContactsAPI.remove(contact);
  }

  render() {
    return (
      <div>
        <ListContacts
          onDeleteContact={this.removeContact}
          contacts={this.state.contacts}
        />
     </div>
    );
  }
}

export default App;

