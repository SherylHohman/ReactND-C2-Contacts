import React from 'react';
import { Link } from 'react-router-dom';
import ImageInput from './ImageInput';
import serializeForm from 'form-serialize';

// at this time it does nothing but render, so.. start with a
//   a Functional Stateless Component

const CreateContact = function(props) {
  const handleSubmit = (e) => {
    // don't let Browser take over handling of the <form>'s <input> data
    e.preventDefault();
    // "serialize" the form data into an JS Object, so "we" can handle the processinf of this data
    const formData = serializeForm(e.target, {hash: true});
    // console.log(formData);
    // if this method was given to us via props from parent (App) component..
    if (props.onCreateContact) {
      // call this function, giving it our new contact's data to process (calls API..)
      props.onCreateContact(formData);
    }
  }

  return (
    <div>
      <Link to="/" className="close-create-contact">Back/CancelClose</Link>
      <form onSubmit={handleSubmit} className="create-contact-form">
        <ImageInput
          className="create-contact-avatar-input"
          name="avatarURL"
          maxHeight={64}
        />
        <div className="create-contact-details">
          <input type="text" name="name" placeholder="Name"/>
          <input type="text" name="email" placeholder="Email"/>
          <button className="create-contact-details">Add Contact</button>
        </div>
      </form>
    </div>
  )
};

export default CreateContact;