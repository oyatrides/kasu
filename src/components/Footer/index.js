import React from 'react';
import { Link } from 'react-router-dom';

import { Menu } from 'semantic-ui-react';
import './style.scss';

const Footer = () => (
  <div className="footer">
    <Menu compact secondary>
      <Menu.Item as={Link} tabIndex="1" to="/mentions-legales" className="footer-items" exact={+true}>Mentions légales</Menu.Item>
      <Menu.Item as={Link} tabIndex="1" to="/team" className="footer-items" exact={+true}>L'équipe</Menu.Item>
      <Menu.Item as={Link} tabIndex="1" to="/contact" className="footer-items" exact={+true}>Contactez-nous</Menu.Item>
    </Menu>
    {/*
    <Label as='a'>
      <Icon disabled name='file alternate outline' />
      Mentions légales
    </Label>
    <Label as='a'>
      <Icon disabled name='users' />
      L'équipe
    </Label>
    <Label as='a'>
      <Icon disabled name='envelope outline' />
      Contactez-nous
    </Label> */}
  </div>
);

export default Footer;