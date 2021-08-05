import api from 'src/api';
import { setLoadingFalse, setLoadingTrue } from '../actions/global';
import { ADD_OR_REMOVE_VOLUMES, ADD_TO_MY_COLLECTION, DELETE_MANGA, LOAD_MANGA_DATABASE, MODIFY_VOLUME_AVAILABILITY, saveMangaDatabase } from '../actions/manga';
import { loadUserFullData } from '../actions/user';

const token = localStorage.getItem('token');
if (token) {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
}

const mangaMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case LOAD_MANGA_DATABASE: {
      store.dispatch(setLoadingTrue());
      api.get('/api/v1/manga')
        .then((response) => {
          console.log('le chargement de la BDD de manga à réussi', response.data);
          store.dispatch(saveMangaDatabase(response.data));
          store.dispatch(setLoadingFalse());
        })
        .catch(
          (error) => {
            store.dispatch(setLoadingFalse());
            console.log('le chargement de la base de donnée de manga a planté', error);
          },
        );
      next(action);
      break;
    }
    case ADD_TO_MY_COLLECTION: {
      const userId = store.getState().user.data.id;
      store.dispatch(setLoadingTrue());
      api.post(`api/v1/user/${userId}/manga`, { title: action.mangaTitle, volumes: action.volumes })
        .then((response) => {
          console.log("l'ajout à ma collection du manga a bien été réalisé", response.data);
        })
        .then((response) => {
          console.log("mise à jour de la DB front");
          store.dispatch(loadUserFullData());
        })
        .catch(
          (error) => {
            console.log('title & volumes ', action.mangaTitle, action.volumes);
            console.log("l'ajout à ma collection du manga a foiré", error);

          },
        )
        .finally((response) => {
          store.dispatch(setLoadingFalse());
        });
      next(action);
      break;
    }
    case MODIFY_VOLUME_AVAILABILITY: {
      const userId = store.getState().user.data.id;
      const { mangaId } = action;
      store.dispatch(setLoadingTrue());
      api.put(`api/v1/user/${userId}/manga/${mangaId}/availability`, { volumes: action.volumeAvailability })
        .then((response) => {
          console.log('la modification de la disponibilité du manga a bien été réalisé', response.data);
        })
        .then((response) => {
          console.log('mise à jour db front après availability update');
          store.dispatch(loadUserFullData());
        })
        .catch(
          (error) => {
            console.log('la modification de la disponibilité du manga a ratée', error);
          },
        )
        .finally(() => {
          store.dispatch(setLoadingFalse());
        });
      next(action);
      break;
    }
    case ADD_OR_REMOVE_VOLUMES: {
      const userId = store.getState().user.data.id;
      const { mangaId } = action;
      store.dispatch(setLoadingTrue());
      api.put(`api/v1/user/${userId}/manga/${mangaId}`, { volumes: action.volumePossessed })
        .then((response) => {
          console.log('l\'ajout ou le retrait de tomes du manga a bien été réalisé', response.data);
        })
        .then((response) => {
          console.log('mise à jour données user après add or remove volumes');
          store.dispatch(loadUserFullData());
        })
        .catch(
          (error) => {
            console.log('l\'ajout ou le retrait de tomes du manga a ratée', error);
          },
        )
        .finally(() => {
          store.dispatch(setLoadingFalse());
        });
      next(action);
      break;
    }
    case DELETE_MANGA: {
      const userId = store.getState().user.data.id;
      const { mangaId } = action;
      store.dispatch(setLoadingTrue());
      api.delete(`api/v1/user/${userId}/manga/${mangaId}`)
        .then((response) => {
          console.log('la suppression d\'un manga a bien été réalisé', response.data);
        })
        .then((response) => {
          console.log('mise à jour données user après delete manga');
          store.dispatch(loadUserFullData());
        })
        .catch(
          (error) => {
            console.log('la suppression d\'un manga a raté', error);
          },
        )
        .finally(() => {
          store.dispatch(setLoadingFalse());
        })
      next(action);
      break;
    }
    default:
      next(action);
  }
};

export default mangaMiddleware;