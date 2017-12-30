import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ListContacts from './ListContacts';
import CreateContact from './CreateContact';
import * as ContactsAPI from './utils/ContactsAPI';

class App extends Component {

  state = {
    contacts : []
  }

  componentDidMount() {
    // fetch our contacts array from our backend DB
    ContactsAPI.getAll().then((contacts) => {
      this.setState({ contacts }) ;          // ES6 syntax
   // this.setState({ contacts: contacts});  // ES5 syntax
    })
  }

  createContact(contact) {
    // send our serialized form data to the Server
    //   using contactsAPI, to store it in the DB
    // - contact comes from CreateContact onhandleSubmit, is serialized form data
    // - response from API contains the new contact
    // - add the new contact to state.contacts (via concat)
    ContactsAPI.create(contact).then(contact => {
      this.setState(state => (
        {contacts: state.contacts.concat([ contact ])}
      ));
      // see: the newContact has been added to the database.
      console.log(this.state);
    })
  }

  removeContact = (contact) => {
    this.setState( (prevState) => ({
      contacts: prevState.contacts.filter((contacts_old) => (
        contacts_old.id !== contact.id
      ))
    }) );
    // .. and delete this removed contact from backend database, using API
    ContactsAPI.remove(contact);
  }
  
  render() {
    return (
      <div>

        <Route exact path="/" render={() => (
          <ListContacts
            onDeleteContact={this.removeContact}
            contacts={this.state.contacts}
          />
        )} />

        <Route path="/create-contact" render={( { history } )=>(
          <CreateContact
            onCreateContact={(newContact) => {
              this.createContact(newContact);
              // return to home page: see 44newContact is now in the contacts list
              history.push('/');
            }
          }/>
        )}/>

     </div>
    );
  }
}

export default App;
