// js/components/EditableContent.jsx
import React, { Component, PropTypes } from 'react';

import { bindHandlers } from '../utils/ComponentUtils';

import TextInput from './TextInput';


class EditableContent extends Component {

  constructor(props, context) {
    super(props, context);

    bindHandlers(this,
      'handleEdit', 'handleCancel', 'handleUpdate'
    );

    this.state = {
      editing: false
    };
  }

  handleEdit(e) {
    this.setState({ editing: true });
  }

  handleCancel(e) {
    this.setState({ editing: false });
  }

  handleUpdate(text) {
    this.props.onUpdate(text);
    this.setState({ editing: false });
  }

  render() {
    if (this.state.editing) {
      return (
        <TextInput text={this.props.text} editing
          onSubmit={this.handleUpdate}
          onCancel={this.handleCancel} />
      );
    } else {
      return (
        <label onDoubleClick={this.handleEdit}>{this.props.text}</label>
      );
    }
  }

}


EditableContent.propTypes = {
  text: PropTypes.string,
  onUpdate: PropTypes.func.isRequired
};


export default EditableContent;