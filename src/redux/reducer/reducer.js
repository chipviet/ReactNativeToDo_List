import {combineReducers} from 'redux';

import addWorkReducer from './addWorkReducer';

const reducer = combineReducers({
  works: addWorkReducer,
});
export default reducer;
