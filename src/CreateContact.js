import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ImageInput from './ImageInput';
import serializeForm from 'form-serialize';

const CreateContact = function(props) {

  const handleSubmit = (e) => {

    //  Prevent Browser from taking over and sending form data to the server.
    //    we want to control how the data is processed
    //    .. and that is defined in the rest of this function.
    e.preventDefault();

    // "serialize" the form data into an JS Object,
    //    so "we" can handle the processing of this data (API can send it as JSON)
    const formData = serializeForm(e.target, {hash: true});

    // verify this method was given to us via props from parent (App) component..
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

CreateContact.propTypes = {
  onCreateContact: PropTypes.func.isRequired
};

export default CreateContact;