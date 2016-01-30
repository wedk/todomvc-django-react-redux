// js/components/Footer.jsx
import React, { Component, PropTypes } from 'react';
import cx from 'classNames';


class Footer extends Component {

  renderTodoCount() {
    const { activeTasksCount } = this.props;
    const itemWord = (activeTasksCount === 1 ? 'item' : 'items');

    return (
      <span className="todo-count">
        <strong>{activeTasksCount}</strong> {itemWord} left
      </span>
    );
  }

  renderFilter(path, filter, title) {
    const { baseUrl, filter: selectedFilter } = this.props;

    return (
      <li>
        <a href={baseUrl + path} className={cx({ selected: filter === selectedFilter })}>
          {title}
        </a>
      </li>
    );
  }

  renderClearButton() {
    const { completedTasksCount, onClearCompleted } = this.props;

    if (completedTasksCount > 0) {
      return (
        <button className="clear-completed" onClick={onClearCompleted}>
          Clear completed
        </button>
      );
    }
    return null;
  }

  render() {
    return (
      <footer className="footer">
        {this.renderTodoCount()}
        <ul className="filters">
          {this.renderFilter('', 'all', 'All')}
          {this.renderFilter('active', 'active', 'Active')}
          {this.renderFilter('completed', 'completed', 'Completed')}
        </ul>
        {this.renderClearButton()}
      </footer>
    );
  }
}


Footer.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  completedTasksCount: PropTypes.number.isRequired,
  activeTasksCount: PropTypes.number.isRequired,
  filter: PropTypes.string.isRequired,
  onClearCompleted: PropTypes.func.isRequired
}


export default Footer;