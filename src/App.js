import React, { Component } from 'react';

class ContactList extends Component {
  render(){
    const people = [
      {name: "Sheryl"},
      {name: "Michael"},
      {name: "Jess"},
      {name: "Clint Kerr"}
    ];

    return (
      <ol>
        {people.map( person => <li key={person.name}>{person.name}</li> )}
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
         <i>This is 'ContactList' - My First React Component:</i>
        </p>
        <ContactList />
      </div>
    );
  }
}

export default App;
