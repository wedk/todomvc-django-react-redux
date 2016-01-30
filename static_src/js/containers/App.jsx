// js/containers/App.jsx
import React, { Component } from 'react';
import { Router } from 'director';

import ProjectList from './ProjectList';
import TaskList from './TaskList';


class App extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      container: null,
      params: {}
    };
  }

  componentDidMount() {
    this.router = Router({
      '/':                              ()           => this.router.setRoute('/projects'),
      '/projects':                      ()           => this.show(ProjectList),
      '/projects/:projectId/?([^\/]*)': (id, filter) => this.show(
                                                          TaskList,
                                                          { id: parseInt(id, 10), filter: filter || 'all' }
                                                        )
    });
    this.router.init('/projects');
  }

  show(container, params={}) {
    this.setState({ container, params });
  }

  renderContainer() {
    return this.state.container
        ? React.createElement(this.state.container, { ...this.state.params, router: this.router })
        : null;
  }

  render() {
    return(
      <section className="todoapp">
        {this.renderContainer()}
      </section>
    );
  }

}


export default App;