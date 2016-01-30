// js/components/CreateInput.jsx
import React, { PropTypes } from 'react';

import PendingOverlay from './PendingOverlay';
import TextInput from './TextInput';


const CreateInput = ({text, placeholder, pending=false, onCreate}) => (
  <div className="create_input">
    {pending && <PendingOverlay />}
    <TextInput
      placeholder={placeholder}
      creation
      text={text}
      pending={pending}
      onSubmit={onCreate} />
  </div>
);


CreateInput.propTypes = {
  text: PropTypes.string,
  placeholder: PropTypes.string,
  pending: PropTypes.bool,
  onCreate: PropTypes.func.isRequired
};


export default CreateInput;