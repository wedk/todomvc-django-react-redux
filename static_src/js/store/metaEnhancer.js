// js/store/metaEnhancer.js


function metaEnhancer(reducer, meta) {
  // call the reducer with empty action to populate the initial state
  const initialState = {
    meta: meta(undefined, {}),
    objects: reducer(undefined, {})
  }

  // return a reducer that handles metadata
  return function (state = initialState, action) {

    // delegate handling the action to the passed reducer
    const newObjects = reducer(state.objects, action);

    // enhance the action by including a reference to the "objects" state
    // (to allow to use the original "combineReducers" implementation)
    const enhanceAction = { $objects: newObjects, ...action };

    return {
      meta: meta(state.meta, enhanceAction),
      objects: newObjects
    };

  }
}


export default metaEnhancer;