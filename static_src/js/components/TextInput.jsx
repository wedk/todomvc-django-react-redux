// js/components/TextInput.jsx
import React, { Component, PropTypes } from 'react';
import cx from 'classNames';

import { bindHandlers } from '../utils/ComponentUtils';


const ESCAPE_KEY = 27;
const ENTER_KEY  = 13;


class TextInput extends Component {

  constructor(props, context) {
    super(props, context);

    bindHandlers(this,
      'handleBlur', 'handleChange', 'handleKeyDown'
    );

    this.state = {
      text: this.props.text || ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.text != this.props.text) {
      this.setState({
        text: nextProps.text
      });
    }
  }

  handleKeyDown(e) {
    // if the state is pending, consume the event
    // to prevent changes but retaining the focus
    if (this.props.pending) {
      e.preventDefault();
      return;
    }

    if (e.which === ENTER_KEY) {
      this.props.onSubmit(e.target.value.trim());
    } else if (e.which === ESCAPE_KEY && this.props.onCancel) {
      this.props.onCancel();
    }
  }

  handleChange(e) {
    // if the state is pending, consume the event
    // to prevent changes but retaining the focus
    if (this.props.pending) {
      e.preventDefault();
      return;
    }

    this.setState({ text: e.target.value });
  }

  handleBlur(e) {
    if (!this.props.creation) {
      this.props.onSubmit(e.target.value.trim());
    }
  }

  render() {
    const classNames = cx({
      edit:       this.props.editing,
      'new-todo': this.props.creation
    });

    return (
      <input
        className={classNames}
        type="text"
        placeholder={this.props.placeholder}
        autoFocus="true"
        value={this.state.text}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown} />
    );
  }
}


TextInput.propTypes = {
  text: PropTypes.string,
  placeholder: PropTypes.string,
  editing: PropTypes.bool,
  creation: PropTypes.bool,
  pending: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func
};


export default TextInput;