# todomvc-django-react-redux

TodoMVC-like experiment using [Django](https://www.djangoproject.com/), [React](https://facebook.github.io/react/) and [Redux](http://redux.js.org/).

This experiment differs from classic TodoMVC implementations by allowing to create multiple projects ; each project containing its own set of tasks (todo items).

* based on [TodoMVC](http://todomvc.com/)
* database persistence
* CRUD projects
* CRUD tasks (todo items)
* inject / hydrate the initial state from the server
* pending states (loading, creating, updating, deleting)


### Technical details

* reducer enhancer (higher order reducer) to handle pending states
* javascript unit testing with [Jest](https://facebook.github.io/jest/)
* [Django REST framework](http://www.django-rest-framework.org/) for building Web APIs
* [Flatiron Director](https://github.com/flatiron/director) for routing
* custom Django middlewares to slow down requests and thus examine pending states


### Prerequisites

* Python 3.5.x
* Django 1.9.x
* Node.js 4.x (and npm 2.x) to build assets (SASS/CSS, JS) with Grunt
* ruby 1.9.x to build SASS files with the SASS gem


### Possible improvements

* [Flux Standard Action](https://github.com/acdlite/flux-standard-action)
* animations and transitions
* increase test coverage


### License

MIT