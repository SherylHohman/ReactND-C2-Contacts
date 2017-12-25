import React from 'react';

const ListContacts = (props) => (
      <ol className='contact-list'>
        {props.contacts.map((contact) => (
          <li key={contact.id} className='contact-list-item'>
            <div className='contact-avatar' style={{
              /* uses Template Literal backticks notation*/
              backgroundImage: `url(${contact.avatarURL})`
            }}/>
            <div className='contact-details'>
              <p>{contact.name}</p>
              <p>{contact.email}</p>
            </div>
            {/* X button to delete a contact */}
            <button onClick={()=>props.onDeleteContact(contact)} className='contact-remove'>
              Remove
            </button>
          </li>
        ))}
      </ol>
    );

export default ListContacts