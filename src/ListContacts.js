import React, { Component } from 'react';
import PropTypes from 'prop-types';
import escapeStringRegexp from 'escape-string-regexp';
import sortBy from 'sort-by'

class ListContacts extends Component {

  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
  }

  // Search Bar <input> string.. to filter contacts list
  state = {
    query: ''
  }

  // bound to Search Bar through <input>'s' onChange() event,
  //   turning (<input>) into a CONTROLLED COMPONENT
  updateQuery = (query) =>  {
    this.setState( {query: query.trim()} );
  }

  clearQuery = () => {
    this.setState( {query: ''} );
  }

  render() {
    //  local convenience variables; via ES6 Object Destructuring syntax
    const {contacts, onDeleteContact} = this.props;
    const {query} = this.state;

    // FILTER CONTACTS BASED ON (query) SEARCH STRING
    let filteredContacts;

    // query === '' is falsey; anything else is truthy
    if (query) {
      // filter contact names based on Search Bar query
      const queryRegex = new RegExp(escapeStringRegexp(query), 'i');
      filteredContacts = contacts.filter( (contact) => queryRegex.test(contact.name) );
    } else {
      // show all contacts
      filteredContacts = contacts;
    }

   // Sort Alphabetically
   filteredContacts = filteredContacts.sort(sortBy('name'));


    // UI
    return (
      // wrapper div for component's UI render method: Search field, List of Contacts
      <div className='list-contacts'>

        {/* Search Form wrapper*/}
        <div className='list-contacts-top'>
          <input
            className='search-contacts'
            type='text'
            placeholder='Search contacts'
            value={this.state.query}
            onChange={ (event) => {this.updateQuery(event.target.value)}}
          />
         </div>

        {/* Conditional JSX Rendering: filtered Contacts Count*/}
        {filteredContacts.length !== contacts.length && (
          <div className='showing-contacts'>
            <p>Showing {filteredContacts.length} of {contacts.length} total contacts.</p>
            <button onClick={()=>this.clearQuery()}>Show All Contacts</button>
          </div>
          )
        }

        {/* Show Contacts */}
        <ol className='contact-list'>
          {filteredContacts.map((contact) => (
            <li key={contact.id} className='contact-list-item'>

              <div className='contact-avatar' style={{
                backgroundImage: `url(${contact.avatarURL})`
              }}/>

              <div className='contact-details'>
                <p>{contact.name}</p>
                <p>{contact.email}</p>
              </div>

              <button onClick={()=>onDeleteContact(contact)} className='contact-remove'>
                Remove
              </button>

            </li>
          ))}

        </ol>
      </div>
    );
  }}

export default ListContacts;
