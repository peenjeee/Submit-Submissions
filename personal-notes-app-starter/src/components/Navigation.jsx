import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FiLogOut, FiArchive, FiMoon, FiSun, FiHome } from 'react-icons/fi';
import ThemeContext from '../contexts/ThemeContext';
import LanguageContext from '../contexts/LanguageContext';

function Navigation({ logout, name }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { locale, toggleLocale } = useContext(LanguageContext);

  return (
    <nav className="navigation">
      <ul>
        <li><button onClick={toggleLocale} className="toggle-locale">{locale === 'id' ? 'EN' : 'ID'}</button></li>
        <li><button onClick={toggleTheme} className="toggle-theme">{theme === 'light' ? <FiMoon /> : <FiSun />}</button></li>
        {name && (
          <>
            <li><Link to="/"><FiHome /></Link></li>
            <li><Link to="/archives"><FiArchive /></Link></li>
            <li><button onClick={logout} className="button-logout"><FiLogOut /> {name}</button></li>
          </>
        )}
      </ul>
    </nav>
  );
}

Navigation.propTypes = {
  logout: PropTypes.func,
  name: PropTypes.string,
};

export default Navigation;
