import React, {Component} from 'react';

// COMPARE traditional ES5 function syntax... to ES6 Arrow Function Syntax..

// function ListContacts(props){
    // return (

// ES6 arrow function syntax:
const ListContacts = (props) => (
      <ol className='contact-list'>
        {props.contacts.map((contact) => (
          <li key={contact.id} className='contact-list-item'>
            <div className='contact-avatar' style={{
              backgroundImage: `url(${contact.avatarURL})`
            }}/>
            <div className='contact-details'>
              <p>{contact.name}</p>
              <p>{contact.email}</p>
            </div>
            <button className='contact-remove'>
              Remove
            </button>
          </li>
        ))}
      </ol>
    );
  // };

// traditional ES5 function syntax...

// function ListContacts(props){
//     return (
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
//             <button className='contact-remove'>
//               Remove
//             </button>
//           </li>
//         ))}
//       </ol>
//     );
//   };

  // Since ListContacts ONLY has a RenderMethod, and No State,
  //   we can use a Functional Stateless Component, rather than a React Component.
  //   - props is passed in as the first argument to the function, and
  //   - we no longer access it (props) using the "this" keyword.
  //     (since this is not a class)
  //   - We use "function" instead of "class..extends Component" syntax.


// For comparative purposes, Below is the Original Component class version:

// class ListContacts extends Component {
//   render(){
//     return (
//         <ol className='contact-list'>
//           {this.props.contacts.map((contact) => (
//             <li key={contact.id} className='contact-list-item'>
//               <div className='contact-avatar' style={{
//                 backgroundImage: `url(${contact.avatarURL})`
//               }}/>
//               <div className='contact-details'>
//                 <p>{contact.name}</p>
//                 <p>{contact.email}</p>
//               </div>
//               <button className='contact-remove'>
//                 Remove
//               </button>
//             </li>
//           ))}
//         </ol>
//       );
//   };
// }

export default ListContacts