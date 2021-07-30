import { SAVE_MANGA_DATABASE } from '../actions/manga';
import { LOGOUT_USER } from '../actions/user';

export const initialState = {
  mangaDatabase: {},
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_MANGA_DATABASE:
      return {
        ...state,
        mangaDatabase: action.database,
      };
    case LOGOUT_USER:
      return {
        mangaDatabase: {},
      };
    default:
      return state;
  }
};

export default reducer;
