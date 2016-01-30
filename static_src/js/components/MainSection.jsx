// js/components/MainSection.jsx
import React, { PropTypes } from 'react';


const MainSection = ({children}) => (
  <section className="main">
    {children}
  </section>
);


MainSection.propTypes = {
  children: PropTypes.node
};


export default MainSection;