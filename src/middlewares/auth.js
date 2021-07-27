import api from 'src/api';
import { LOGIN_USER, REGISTER_USER, saveUser, LOGOUT_USER, saveUserConversations } from 'src/actions/user';
import { setLoadingFalse, setLoadingTrue } from '../actions/global';
import { wsDisconnect } from '../actions/chat';

const authMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case LOGIN_USER: {
      const { pseudo, password } = store.getState().user;
      store.dispatch(setLoadingTrue());
      api
        .post('api/login_check', { username: pseudo, password })
        .then(
          (response) => {
            console.log(response);

            store.dispatch(saveUser(response.data));

            api.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
            localStorage.setItem('token', response.data.token);
          },
        )
        .then((response) => {
          const userId = store.getState().user.data.id;
          api
            .get(`api/v1/user/${userId}/chat`)
            .then(
              (response2) => {
                console.log(response2);

                store.dispatch(saveUserConversations(response2.data));
                store.dispatch(setLoadingFalse());
                // store.dispatch(wsConnect());
              },
            );
        });

      next(action);
      break;
    }

    case LOGOUT_USER:
      localStorage.removeItem('token');
      delete api.defaults.headers.common.Authorization;
      store.dispatch(wsDisconnect());
      next(action);
      break;
    case REGISTER_USER: {
      const {
        pseudo,
        password,
        email,
        firstName,
        lastName,
        address,
        zipCode,
        city,
      } = store.getState().user;
      api
        .post('/api/v1/user/add', {
          email,
          firstname: firstName,
          lastname: lastName,
          pseudo,
          password,
          address,
          zip_code: zipCode,
          city,
          status: 1,
        })
        .then(
          (response) => {
            console.log({
              email,
              firstname: firstName,
              lastname: lastName,
              pseudo,
              password,
              address,
              zip_code: zipCode,
              city,
              status: 1,
            });
            console.log(response);
          },
        )
        .catch(
          (error) => {
            console.log({
              email,
              firstname: firstName,
              lastname: lastName,
              pseudo,
              password,
              address,
              zip_code: zipCode,
              city,
              status: 1,
            });
            console.log(error);
          },
        );
      next(action);
      break;
    }
    default:
      next(action);
  }
};

export default authMiddleware;
