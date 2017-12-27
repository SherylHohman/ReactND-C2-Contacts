import React, { Component } from 'react';
import ListContacts from './ListContacts';
import CreateContact from './CreateContact';
import * as ContactsAPI from './utils/ContactsAPI';

class App extends Component {

  state = {
    contacts : [],
    // Temp for Understanding: use 'state' to store which screen the user should see
    //   we manually hard code the value in the code for now..
    //   App Component will use conditional rendering based on this value
    //     to decide which "page" or component gets rendered.
    //   valid values: 'Create Contact Page', or 'List Contacts Page'
    // screenToShow: 'List Contacts Page'
    screenToShow: 'Create Contact Page'
  }

  componentDidMount() {
    // fetch our contacts array from our backend DB
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

    // now, delete the removed contact from backend database, using API
    ContactsAPI.remove(contact);
  }

  switchScreenToShow = () => {
    const validScreens = ['List Contacts Page', 'Create Contact Page'];
    let newScreen = 'List Contacts Page';  // default value in case of invalid state
      if (this.state.screenToShow === validScreens[0]) {
        newScreen = validScreens[1]
      }
      else {
        newScreen = validScreens[0]
      };
    this.setState({screenToShow: newScreen})
  };

  render() {
    return (
      <div>

        {/* conditionally render "page" based on state*/}
        {this.state.screenToShow==='List Contacts Page' && (
          <ListContacts
            onDeleteContact={this.removeContact}
            contacts={this.state.contacts}
          />
        )}
        {this.state.screenToShow==='Create Contact Page' && (
          <CreateContact />
        )}

        {/* button to auto swap which "page" user sees*/}
        <button onClick={()=>this.switchScreenToShow()}>Switch Pages</button>

     </div>
    );
  }
}

export default App;
