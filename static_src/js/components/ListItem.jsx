// js/components/ListItem.jsx
import React, { Component, PropTypes } from 'react';
import cx from 'classNames';

import { bindHandlers } from '../utils/ComponentUtils';
import { xor } from '../utils/PropTypesUtils';

import TextInput from './TextInput';
import PendingOverlay from './PendingOverlay';


class ListItem extends Component {

  constructor(props, context) {
    super(props, context);

    bindHandlers(this,
      'handleSelect', 'handleEdit', 'handleCancel',
      'handleUpdate', 'handleToggle', 'handleDestroy'
    );

    this.state = {
      editing: false
    };
  }

  handleSelect(e) {
    if (this.props.onSelect) {
      this.props.onSelect(this.props.id);
    }
  }

  handleToggle(e) {
    this.props.onToggle(this.props.id, e.target.checked);
  }

  handleDestroy(e) {
    this.props.onDestroy(this.props.id);
  }

  handleEdit(e) {
    this.setState({ editing: true });
  }

  handleCancel(e) {
    this.setState({ editing: false });
  }

  handleUpdate(text) {
    this.props.onUpdate(this.props.id, text);
    this.setState({ editing: false });
  }

  renderToggleButton() {
    if (this.props.onToggle) {
      return (
        <input
          className="toggle"
          type="checkbox"
          checked={this.props.checked}
          onChange={this.handleToggle} />
      );
    }
    return null;
  }

  renderLabel() {
    let attrs = {};
    if (this.props.onSelect) {
      attrs['onClick'] = this.handleSelect;
    } else if (this.props.onUpdate) {
      attrs['onDoubleClick'] = this.handleEdit;
    }
    return (<label {...attrs}>{this.props.text}</label>);
  }

  renderDestroyButton() {
    if (this.props.onDestroy && !this.props.pending) {
      return (
        <button className="destroy" onClick={this.handleDestroy} />
      );
    }
    return null;
  }

  renderInputField() {
    if (this.state.editing) {
      return (
        <TextInput text={this.props.text} editing
          onSubmit={this.handleUpdate}
          onCancel={this.handleCancel} />
      );
    }
    return null;
  }

  render() {
    const classNames = cx({
      editing: this.state.editing,
      completed: this.props.checked,
      pending: this.props.pending
    });

    return (
      <li className={classNames}>
        {this.props.pending && <PendingOverlay text={this.props.pendingText} />}
        <div className="view">
          {this.renderToggleButton()}
          {this.renderLabel()}
          {this.renderDestroyButton()}
        </div>
        {this.renderInputField()}
      </li>
    );
  }

}


ListItem.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string,
  checked: PropTypes.bool,
  pending: PropTypes.bool,
  pendingText: PropTypes.string,
  onToggle: PropTypes.func,
  onSelect: PropTypes.func,
  onUpdate: xor('onSelect', PropTypes.func),
  onDestroy: PropTypes.func
};


export default ListItem;