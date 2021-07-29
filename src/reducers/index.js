/* eslint-disable linebreak-style */
import { combineReducers } from 'redux';

import userReducer from './user';
import chatReducer from './chat';
import globalReducer from './global';
import searchReducer from './search';

const rootReducer = combineReducers({
  user: userReducer,
  chat: chatReducer,
  global: globalReducer,
  search: searchReducer,
});

export default rootReducer;
