import {createStore, applyMiddleware} from 'redux';
import reducer from './reducer/reducer';
import thunk from 'redux-thunk';
import devToolsEnhancer from 'remote-redux-devtools';
import { composeWithDevTools } from 'remote-redux-devtools';

export default function configureStore(initialState) {
  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(thunk),
    )
  );

  if (module.hot) {
    // Enable hot module replacement for reducers
    module.hot.accept(() => {
      const nextRootReducer = require('./reducer/reducer').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};
