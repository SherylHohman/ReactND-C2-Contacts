import React, { Component } from 'react';
import ListContacts from './ListContacts';
import CreateContact from './CreateContact';
import * as ContactsAPI from './utils/ContactsAPI';

class App extends Component {

  state = {
    contacts : [],
    // Temp: use 'state' to conditional rendering a page of a Single Page App (SPA)
    // See switchScreenToShow() for valid values:
    screenToShow: 'List Contacts Page'
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

    // .. and delete this removed contact from backend database, using API
    ContactsAPI.remove(contact);
  }

  switchScreenToShow = () => {
    const validScreens = ['List Contacts Page', 'Create Contact Page'];
    const curIndex = validScreens.indexOf(this.state.screenToShow);
    // notice: if curIndex == -1, validScreens[0] will become the new page

    // cycle through all validScreens in order listed
    const newIndex = (curIndex + 1) % validScreens.length;
    const newScreen = validScreens[newIndex];
    this.setState({screenToShow: newScreen})
  };

  render() {
    return (
      <div>

        {/* conditionally render "page" based on state*/}
        {/* onAddContact PROP with inline func to so ListContacts can have
            an "add Contact LINK" (next to SearchBar) that changes state and hence the viewable "page"
            (L5 2.DynamicallyRenderPages, video2)
        */}
        {this.state.screenToShow==='List Contacts Page' && (
          <ListContacts
            onDeleteContact={this.removeContact}
            contacts={this.state.contacts}
            onAddContact={() => {
              this.setState({
                screenToShow: 'Create Contact Page'
              });
            }}
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
