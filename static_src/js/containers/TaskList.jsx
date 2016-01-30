// js/containers/TaskList.jsx
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { bindHandlers } from '../utils/ComponentUtils';
import { dismissFlash } from '../actions/AppActions';
import * as actions from '../actions/TaskActions';
import * as projectActions from '../actions/ProjectActions';
import ProjectService from '../services/ProjectService';
import TaskService from '../services/TaskService';

import Flash from '../components/Flash';
import Header from '../components/Header';
import EditableContent from '../components/EditableContent';
import MainSection from '../components/MainSection';
import Loading from '../components/Loading';
import List from '../components/List';
import ListItem from '../components/ListItem';
import Footer from '../components/Footer';


class TaskList extends Component {

  constructor(props, context) {
    super(props, context);

    bindHandlers(this,
      'handleFlashDismiss',
      'handleProjectUpdate', 'handleCreate', 'handleToggle', 'handleToggleAll',
      'handleUpdate', 'handleDestroy', 'handleClearCompleted'
    );
  }

  componentDidMount() {
    this.props.dispatch(actions.fetchTasks(this.props.project.id));
  }

  handleFlashDismiss() {
    this.props.dispatch(dismissFlash());
  }

  handleProjectUpdate(name) {
    const { id, name: prevName } = this.props.project;
    if (name.length !== 0 && name != prevName) {
      this.props.dispatch(projectActions.updateProject(id, name));
    }
  }

  handleCreate(title) {
    if (title.length !== 0) {
      this.props.dispatch(actions.createTask(this.props.id, title));
    }
  }

  handleToggle(taskId, completed) {
    this.props.dispatch(actions.toggleTask(this.props.id, taskId, completed));
  }

  handleToggleAll(e) {
    const completed = e.target.checked;
    this.props.dispatch(actions.toggleAllTasks(this.props.id, completed));
  }

  handleUpdate(prevTitle, taskId, title) {
    if (title.length === 0) {
      this.handleDestroy(taskId);
    } else if (title != prevTitle) {
      this.props.dispatch(actions.updateTask(this.props.id, taskId, title));
    }
  }

  handleDestroy(taskId) {
    this.props.dispatch(actions.destroyTask(this.props.id, taskId));
  }

  handleClearCompleted() {
    this.props.dispatch(actions.clearCompleted(this.props.id));
  }

  renderToggleAll() {
    const { report } = this.props;

    return [
      <input key="toggle-all" id="toggle-all"
        className="toggle-all"
        type="checkbox"
        checked={(report.active == 0 && report.completed > 0)}
        onChange={this.handleToggleAll} />,
      <label htmlFor="toggle-all" key="toggle-all-label">Mark all as complete</label>
    ];
  }

  renderItems() {
    return this.props.tasks.map(task => (
      <ListItem key={task.id} id={task.id}
        text={task.title}
        checked={task.completed}
        pending={task.$pending}
        pendingText={task.$cause}
        onToggle={this.handleToggle}
        onUpdate={this.handleUpdate.bind(null, task.title)}
        onDestroy={this.handleDestroy} />
    ));
  }

  renderFooter() {
    const { project, report, filter } = this.props;

    if (report.count > 0) {
      return (
        <Footer
          baseUrl={`#/projects/${project.id}/`}
          completedTasksCount={report.completed}
          activeTasksCount={report.active}
          filter={filter}
          onClearCompleted={this.handleClearCompleted} />
      );
    }
    return null;
  }

  render() {
    const { project } = this.props;
    return (
      <div>
        {this.props.flash && <Flash message={this.props.flash} onDismiss={this.handleFlashDismiss} />}
        <div className="back">
          <a href="#/projects">&#9664; Back to project list</a>
        </div>
        <Header
          text={this.props.creating.title}
          placeholder="What needs to be done?"
          pending={this.props.creating.$pending}
          onCreate={this.handleCreate}>
          <EditableContent text={project.name} onUpdate={this.handleProjectUpdate} />
        </Header>
        <MainSection>
          {this.renderToggleAll()}
          {this.props.loading && <Loading />}
          <List>
            {this.renderItems()}
          </List>
          {this.renderFooter()}
        </MainSection>
      </div>
    );
  }

}


TaskList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  router: PropTypes.object,
  id: PropTypes.number.isRequired,
  filter: PropTypes.string.isRequired,
  flash: PropTypes.string,
  loading: PropTypes.bool,
  creating: PropTypes.shape({
    title: PropTypes.string,
    $pending: PropTypes.bool.isRequired
  }).isRequired,
  project: PropTypes.object.isRequired,
  tasks: PropTypes.array.isRequired,
  report: PropTypes.shape({
    count: PropTypes.number.isRequired,
    active: PropTypes.number.isRequired,
    completed: PropTypes.number.isRequired
  }).isRequired
};


function mapStateToProps(state, ownProps) {
  const projectService = new ProjectService(state.projects);
  const taskService = new TaskService(state.tasks, ownProps.id);

  return {
    flash: state.flash.message,
    loading: state.tasks.meta.loading,
    creating: state.tasks.meta.creating,
    project: projectService.find(ownProps.id),
    tasks: taskService.findByFilter(ownProps.filter),
    report: taskService.getReport()
  };
}


export default connect(mapStateToProps)(TaskList);