// == Import npm
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Nav from 'src/containers/Nav';
import Home from 'src/containers/Home';
import Footer from 'src/components/Footer';
import SearchResultsByLocation from 'src/containers/SearchResultsByLocation';
import LoginForm from 'src/containers/LoginForm';
import Register from 'src/containers/Register';
import ContactForm from 'src/containers/ContactForm';
import Conversations from 'src/containers/Conversations';
import SetProfilPage from 'src/containers/SetProfilPage';
import ManageMyCollection from 'src/containers/ManageMyCollection';
import ViewProfilPage from 'src/containers/ViewProfilPage';
import Team from 'src/components/Team';
import LegalNotice from 'src/components/LegalNotice';
import Chat from 'src/containers/Chat';
// == Import

import './style.scss';
import { Route, Switch } from 'react-router-dom';
import { useBeforeunload } from 'react-beforeunload';
import Loading from './Loading';
// == Composant
const App = ({

  theme, onPageLoad, onRefreshOrTabClosing, isLogged, chatId, loading, mangaDatabase, loadMangaDatabase,
}) => {
  const handleOnClose = () => {
    if (isLogged) {
      onRefreshOrTabClosing();
    }
  };

  useBeforeunload(() => {
    handleOnClose();
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    console.log('App useEffect', {
      isLogged, chatId, mangaDatabase, token,
    });
    if (isLogged && chatId) {
      onPageLoad(chatId);
    }
    if (!mangaDatabase && isLogged && token) {
      console.log('mangaDatabase useEffect test', { mangaDatabase, token });
      loadMangaDatabase();
    }
  }, [chatId, isLogged, mangaDatabase, token]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={`app ${theme}`}>

      <Nav />
      <Switch>
        <Route path="/" exact>
          <Home />
          <Footer />
        </Route>
        <Route path="/login" exact>
          <LoginForm />
          <Footer />
        </Route>
        <Route path="/register" exact>
          <Register />
          <Footer />
        </Route>
        <Route path="/contact" exact>
          <ContactForm />
          <Footer />
        </Route>
        <Route path="/conversations" exact>
          <Conversations />
        </Route>
        <Route path="/conversation/:id" exact>
          <Chat />
        </Route>
        <Route path="/rechercher/ville" exact>
          <SearchResultsByLocation />
          <Footer />
        </Route>
        <Route path="/profil/collection" exact>
          <ManageMyCollection />
          <Footer />
        </Route>
        <Route path="/profil/mes-infos" exact>
          <ViewProfilPage />
          <Footer />
        </Route>
        <Route path="/profil/:id" exact>
          <SetProfilPage />
          <Footer />
        </Route>
        <Route path="/team" exact>
          <Team />
          <Footer />
        </Route>
        <Route path="/mentions-legales" exact>
          <LegalNotice />
          <Footer />
        </Route>
      </Switch>
    </div>
  );
};

App.propTypes = {
  theme: PropTypes.string.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  loading: PropTypes.bool,
};

App.defaultProps = {
  loading: false,
};

// == Export
export default App;
