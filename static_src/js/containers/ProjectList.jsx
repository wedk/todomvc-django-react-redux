// js/containers/ProjectList.jsx
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { bindHandlers } from '../utils/ComponentUtils';
import { dismissFlash } from '../actions/AppActions';
import * as actions from '../actions/ProjectActions';
import ProjectService from '../services/ProjectService';

import Flash from '../components/Flash';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import Loading from '../components/Loading';
import List from '../components/List';
import ListItem from '../components/ListItem';


class ProjectList extends Component {

  constructor(props, context) {
    super(props, context);

    bindHandlers(this,
      'handleFlashDismiss', 'handleCreate', 'handleSelect', 'handleDestroy'
    );
  }

  componentDidMount() {
    this.props.dispatch(actions.fetchProjects());
  }

  handleFlashDismiss() {
    this.props.dispatch(dismissFlash());
  }

  handleCreate(name) {
    if (name.length !== 0) {
      this.props.dispatch(actions.createProject(name));
    }
  }

  handleSelect(projectId) {
    this.props.router.setRoute(`/projects/${projectId}`);
  }

  handleDestroy(projectId) {
    this.props.dispatch(actions.destroyProject(projectId));
  }

  renderItems() {
    return this.props.projects.map(project => (
      <ListItem key={project.id} id={project.id}
        text={project.name}
        pending={project.$pending}
        pendingText={project.$cause}
        onSelect={this.handleSelect}
        onDestroy={this.handleDestroy} />
    ));
  }

  render() {
    return (
      <div>
        {this.props.flash && <Flash message={this.props.flash} onDismiss={this.handleFlashDismiss} />}
        <Header
          title="projects"
          text={this.props.creating.name}
          placeholder="New project?"
          pending={this.props.creating.$pending}
          onCreate={this.handleCreate} />
        <MainSection>
          {this.props.loading && <Loading />}
          <List concern="project-list">
            {this.renderItems()}
          </List>
        </MainSection>
      </div>
    );
  }

}


ProjectList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  router: PropTypes.object,
  flash: PropTypes.string,
  loading: PropTypes.bool,
  creating: PropTypes.shape({
    name: PropTypes.string,
    $pending: PropTypes.bool.isRequired
  }).isRequired,
  projects: PropTypes.array.isRequired
};


function mapStateToProps(state, ownProps) {
  const projectService = new ProjectService(state.projects);

  return {
    flash: state.flash.message,
    loading: state.projects.meta.loading,
    creating: state.projects.meta.creating,
    projects: projectService.findAll()
  };
}


export default connect(mapStateToProps)(ProjectList);