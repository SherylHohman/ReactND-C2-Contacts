import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import escapeStringRegexp from 'escape-string-regexp';
import sortBy from 'sort-by';

class ListContacts extends Component {

  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired,
    onAddContact: PropTypes.func  // temp
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
      filteredContacts = contacts.filter((contact) => queryRegex.test(contact.name));
    } else {
      // show all contacts
      filteredContacts = contacts;
    }

   // Sort Alphabetically
   filteredContacts.sort(sortBy('name'));


    // UI
    return (
      // wrapper div for component's UI render method: Search Bar, Contacts List
      <div className='list-contacts'>

        {/* wrapper for: Search Form, Add Contact Link */}
        <div className='list-contacts-top'>
          {/* Search Bar */}
          <input
            className='search-contacts'
            type='text'
            placeholder='Search contacts'
            value={this.state.query}
            onChange={ (event) => {this.updateQuery(event.target.value)}}
          />

          {/* "Add Contact" LINK to the right of search field */}
          {/* TODO: WHY - LINK <a>: breaks state.screenToShow value
                but NOT a BUTTON <button>?! Supposed to have <a> tag here..
                See Notes at bottom of file.
          */}

          {/* Replace `<a>`` tag (Ok, I had a <button> - it was supposed to be an `<a>`)
                with React Router's `<Link>`` component
                - `href` attribute is replaced by `to` property
                - `onClick` no longer needed, as React Router takes care of STATE!
              L5_ReactRouter 4. The Link Component, vid-2
          */}
          {/* Add Contact Link */}
          <Link
            className="add-contact"
            to="/create-contact"
          >Add Contact</Link>
          {/* Note that while address bar Does Update, the Page
                doesn't YET change, as we have more to do to hook that up
          */}
         </div>

        {/* Conditional JSX Rendering: filtered Contacts Count*/}
        {filteredContacts.length !== contacts.length && (
          <div className='showing-contacts'>
            <p>Showing {filteredContacts.length} of {contacts.length} total contacts.</p>
            <button onClick={this.clearQuery}>Show All Contacts</button>
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

/* TODO: Understand / Fix  the Wonky state.screenToShow value Reset !!
   Resulting In:
   STRANGE Navigation Behaviour if I use an <a> tag for "Add Contact Nav" */
  /* "Create Contact" LINK to the right of search field */
  /* We're supposed to have an LINK: here NOT a BUTTON !
      ie  "<a ...> Add Contact </a>""
      NOT "<button...> Add Contact </button>"
        BUT.. After BRIEFLY navigating to the 'Add Contact Page',
        it immediately re-navigates back to 'List Contacts Page' !!???!!!
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

    github commit for instructor's code:
      https://github.com/udacity/reactnd-contacts-complete/blob/23a6a4dde977d7c18a3054a7b0b65f4fb4aad2ea/src/ListContacts.js
  */

  /* Problem Persists:
    EVEN IF I GET RID of My switchPages Button and method in App.js, t
    his STILL doesn't work properly. Same Funky Nav behaviour, and
    state.screenToShow value and setState{screenToShow} values/functionality !!
  */
