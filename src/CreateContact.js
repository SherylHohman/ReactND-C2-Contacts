import React from 'react';
import { Link } from 'react-router-dom';
import ImageInput from './ImageInput';
import serializeForm from 'form-serialize';

// create dummy "create contact" "screen" ie component.
// at this time it does nothing but renter, so.. start with a
//   a Functional Stateless Component

const CreateContact = function(props) {

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = serializeForm(e.target, {hash: true});
    console.log(formData);
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