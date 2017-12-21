import React, { Component } from 'react';

class ContactList extends Component {
  render(){
    const contacts = this.props.contacts;

    return (
      <ol>
        {contacts.map( contact => (
          <li key={contact.name}>{contact.name}</li>
          ))}
      </ol>
      );
  };
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Contacts App</h1>
        </header>
        <p className="App-intro">
         <i>Reusable 'ContactList' Component with different 'contracts' prop passed in</i>
        </p>
        <ContactList contacts={[
          {name: "Sheryl"},
          {name: "Michael"},
          {name: "Jess"},
          {name: "Clint Kerr"}
        ]}/>
        <ContactList contacts={[
          {name: "Hartman Products"},
          {name: "The Plastic Molding Shop"},
          {name: "WhiteCap Supply"},
          {name: "LAWLA at LAX"}
        ]}/>
      </div>
    );
  }
}

export default App;
