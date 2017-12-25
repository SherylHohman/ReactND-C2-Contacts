import React, { Component } from 'react';
import PropTypes from 'prop-types';
import escapeStringRegexp from 'escape-string-regexp';
import sortBy from 'sort-by'

class ListContacts extends Component {

  // propTypes is now a static property on our class,
  // after refactor from Functional Stateless Component
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
  }

  // add state Object.  query "key" holds input string for filtering contacts list
  state = {
    query: ''
  }

  // updateQuery method will be "bound" to the Search FORM's INPUT field
  //   to become a CONTROLLED COMPONENT
  // updateQuery method will be used to update state={query: ..} once bound to
  //   JavaScript's Input Field's onChange() event is fired.
  updateQuery = (query) =>  {
    this.setState( {query: query.trim()} );
  }
  // equivalent ES5 syntax:
  //   updateQuery(query) {
  //     return this.setState( {query: query.trim()} );
  //   }

  // new state does not depend on old state, so
  // we simply pass its new value into setState
  //   it's an object containing the new value of the (query) state variable
  // trim() is used to remove any whitespace surrounding the user's input

  // I don't quite understand the syntax:
  //               methodName = (param) => {...}
  // equivalent to:
  //               methodName(param) {return ...}

  // INPUT field's value will be set to whatever value is stored in state's query property.

  render() {

    //  L3 Module 7: Controlled Components, vid
    //  local variables convenience variables to simply code
    //    using ES6 Object Destructuring syntax,
    //    ..or UnPacking the properties into variables/constants
    //    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    const {contacts, onDeleteContact} = this.props;
    const {query} = this.state;

    // L3, Module 7: Controlled Components
    // FILTER CONTACTS BASED ON (query) SEARCH STRING
    // holds the list of contacts passing Search Query filter
    let filteredContacts;
    // '' is falsy, anything else is truthy
    if (query) {
      // create new regex object, escape user's query string, 'i' flag for case insensitive
      const queryRegex = new RegExp(escapeStringRegexp(query), 'i');
      // regexExpression.test(myString) returns true
      //   if myString matches regexExpression
      // use that as the boolean check for FILTERing our this.props contacts array
      // rem ES6 syntax for FILTER: myArray.filter( (element) => booleanTest );
      filteredContacts = contacts
                        .filter( (contact) => queryRegex.test(contact.name) );
    } else {
      // show all contacts
      filteredContacts = contacts;
    }

    // now sort that filteredContacts list alphabetically by name
    //   uses JS sort method, passing in the imported sortBy function
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
            { /* value attribute's value
                 ..puts state's query property to input field's value */ }
            { /* onChange attribute's value
                .. binds updateQuery method to this search form's input field */ }

            {/* when JS detects new user input, fire updateQuery
                to change query's state,
                which will trigger UI re-render, and
                update the input field's value to the new value of the
                  state's query property */}

            {/* onInput() is an JS Event Object that gets fired when
                an <input> or <textarea> HTML element changes, due to user typing..  */}
            {/* onChange() is an JS Event Object that gets fired  when
                an <input> or <textarea> or <select> HTML element LOOSES FOCUS
               (and was changed?) */}
            {/* https://www.w3schools.com/jsref/event_oninput.asp */}

            {/* event and event.target.value are come from those
                JS eventHandlers or EventListners (not sure of proper terminology) */}
        </div>

        {/* Conditional JSX Rendering */}
        {/* L3 Module 7: Controlled Component, vid 5: Showing Contacts Count */ }
        {/* Indicate number of filtered contacts out of total*/}
        <div className='showing-contacts'>
        {filteredContacts.length !== contacts.length && (
          <p>Showing {filteredContacts.length} of {contacts.length} total contacts. </p>
          )
        }
        </div>


        {/* List of Contacts */}
        <ol className='contact-list'>
          {/* L3 Module 7: Controlled Components - filter on query string
              we no longer want to map over the full contacts list,
              we want to map over our filtered list of contacts
          */}
          {/* {this.props.contacts.map((contact) => ( */}
          {filteredContacts.map((contact) => (
            <li key={contact.id} className='contact-list-item'>

              <div className='contact-avatar' style={{
                backgroundImage: `url(${contact.avatarURL})`
              }}/>

              <div className='contact-details'>
                <p>{contact.name}</p>
                <p>{contact.email}</p>
              </div>

              {/* invoke onDeleteContact (App.removeContact) whenever this button is clicked on*/}
              {/* odd syntax for defining the arrow function that onClick invokes. ()=>fn_name()  */}
              {/* Lesson3 Module 5: Updating State with setState */}
              <button onClick={()=>onDeleteContact(contact)} className='contact-remove'>
                Remove
              </button>

            </li>
          ))}

        </ol>
      </div>
    );
  }}

// refactor from Functional Stateless Component to Component with state
//   requires we move propTypes inside the class, as a static property
//   see above; remove below.

// L3, Module 6: PropTypes
// add a PROPERTY, propTypes ot our ListContacts Component
// note that:
// - the component's Property has a lower-case p
// - the class PropTypes (we imported) has an Upper-case P

// ListContacts.propTypes = {
//   contacts: PropTypes.array.isRequired,
//   onDeleteContact: PropTypes.func.isRequired
// };



// // COMPARE with BELOW: as a Stateless FUNCTIONAL Component

// // import React from 'react';
// // we don't need to import {Component},
// // when using a Functional Stateless Component

// // Compare next two lines
// //   traditional ES5 function syntax... to ES6 Arrow Function Syntax..
// // function ListContacts(props){
//     // return ( ...

// // to ES6 arrow function syntax:
// const ListContacts = (props) => (
//       <ol className='contact-list'>
//         {props.contacts.map((contact) => (
//           <li key={contact.id} className='contact-list-item'>

//             <div className='contact-avatar' style={{
//               backgroundImage: `url(${contact.avatarURL})`
//             }}/>

//             <div className='contact-details'>
//               <p>{contact.name}</p>
//               <p>{contact.email}</p>
//             </div>

//             {/* invoke onDeleteContact (App.removeContact) whenever this button is clicked on*/}
//             {/* odd syntax for defining the arrow function that onClick invokes. ()=>fn_name()  */}
//             {/* Lesson3 Module 5: Updating State with setState */}
//             <button onClick={()=>props.onDeleteContact(contact)} className='contact-remove'>
//               Remove
//             </button>

//           </li>
//         ))}
//       </ol>
//     );
//   // };

// // L3, Module 6: PropTypes
// // add a PROPERTY, propTypes ot our ListContacts Component
// // note that:
// // - the component's Property has a lower-case p
// // - the class PropTypes (we imported) has an Upper-case P
// ListContacts.propTypes = {
//   contacts: PropTypes.array.isRequired,
//   onDeleteContact: PropTypes.func.isRequired
// };


export default ListContacts


// L3, Module 7: Controlled Components
// This Module adds a Search Form to ListContacts UI
// The Search Form will
//  - filter ListContacts UI based on query typed in by user to
//    display only contacts matching the query string
//  - adds a section indicating how many contacts have been filtered out by the query string,
//    and a "show All" button that removes the query filter

// 1. Search query string adds STATE to our component,
//    so we need to refactor our Stateless Functional Component (back)
//    into a Component (with state)