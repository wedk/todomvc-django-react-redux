// js/components/Header.jsx
import React, { PropTypes } from 'react';

import CreateInput from './CreateInput';


const Header = ({title, text, placeholder, pending=false, onCreate, children}) => (
  <header className="header">
    <h1>{title || children}</h1>
    <CreateInput
      text={text}
      placeholder={placeholder}
      pending={pending}
      onCreate={onCreate} />
  </header>
);


Header.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  placeholder: PropTypes.string,
  pending: PropTypes.bool,
  onCreate: PropTypes.func.isRequired,
  children: PropTypes.node
};


export default Header;