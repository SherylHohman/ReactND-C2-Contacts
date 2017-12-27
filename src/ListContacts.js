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
          {/* Search Bar */}
          <input
            className='search-contacts'
            type='text'
            placeholder='Search contacts'
            value={this.state.query}
            onChange={ (event) => {this.updateQuery(event.target.value)}}
          />
          {/* "Create Contact" LINK to the right of search field */}
          {/* We're supposed to have an LINK: here NOT a BUTTON !
              ie  "<a ...> Add Contact </a>""
              NOT "<button...> Add Contact </button>"
                BUT.. After BRIEFLY navigating to the 'Add Contact Page', it immediately re-navigates back to 'List Contacts Page' !!???!!!
                No Clue WHY.
                -- something with href RELOADING the page??
                Spend MANY Hours trying to fix. (see branch L5_strange_nav..)
              BUT.. changing this to a button WORKS
                - Nav Works, BUT
                - address Bar Does NOT change  (href is prob not a supported attribute for buttons)
                - button is uglier (css prob could fix)
              using <a> ..</a>
                - Address Bar WORKS: changes to the indicated "href" string
                - navigation gets funky (in the VIDEO, it did Not)
                - css looks prettier, as intended
              We'll be switching to React Router Soon anyway.
          */}
          <button
            className="add-contact"
            href="/create-contact"
            onClick={this.props.onAddContact}
          >Add Contact</button>
         </div>
          {/* Neither work properly with <a>, both work with <button>
                  onClick={() => {this.props.onAddContact()}}
                  onClick={this.props.onAddContact}
              EVEN IF I GET RID of My switchPages Button and method in App.js, this STILL doesn't work properly. Same Funky behaviour.
          */}

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
