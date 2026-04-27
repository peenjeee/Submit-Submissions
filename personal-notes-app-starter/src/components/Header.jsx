import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import LanguageContext from '../contexts/LanguageContext';

function Header({ logout, name }) {
  const { locale } = useContext(LanguageContext);
  return (
    <header>
      <h1>
        <Link to="/" style={{ textDecoration: 'none' }}>{locale === 'id' ? 'Aplikasi Catatan Pribadi' : 'Personal Notes App'}</Link>
      </h1>
      <Navigation logout={logout} name={name} />
    </header>
  );
}

Header.propTypes = {
  logout: PropTypes.func,
  name: PropTypes.string,
};

export default Header;
