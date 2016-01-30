// js/components/PendingOverlay.jsx
import React, { PropTypes } from 'react';


const PendingOverlay = ({text}) => (
  <div className="overlay">
    {text} <img src="/static/loading.gif" alt={text || 'processing...'} />
  </div>
);


PendingOverlay.propTypes = {
  text: PropTypes.string
};


export default PendingOverlay;