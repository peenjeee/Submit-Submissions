import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import LanguageContext from '../contexts/LanguageContext';

function NotFoundPage() {
  const { locale } = useContext(LanguageContext);

  return (
    <section className="not-found-page">
      <h2>404</h2>
      <p>{locale === 'id' ? 'Halaman tidak ditemukan.' : 'Page not found.'}</p>
      <Link to="/">{locale === 'id' ? 'Kembali' : 'Back'}</Link>
    </section>
  );
}

export default NotFoundPage;
