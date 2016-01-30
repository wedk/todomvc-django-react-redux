// js/components/Flash.jsx
import React, { Component, PropTypes } from 'react';

import { bindHandlers } from '../utils/ComponentUtils';


class Flash extends Component {

  constructor(props, context) {
    super(props, context);

    bindHandlers(this,
      'handleDismiss'
    );
  }

  componentDidMount() {
    this.timeout = setTimeout(this.handleDismiss, 5000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  handleDismiss() {
    clearTimeout(this.timeout);
    this.props.onDismiss();
  }

  render() {
    return(
      <div className="flash">
        <button type="button" onClick={this.handleDismiss}>&times;</button>
        {this.props.message}
      </div>
    );
  }

}


Flash.propTypes = {
  message: PropTypes.string.isRequired,
  onDismiss: PropTypes.func.isRequired
};


export default Flash;