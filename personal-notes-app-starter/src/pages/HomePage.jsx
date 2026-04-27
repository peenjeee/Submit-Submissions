import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import NotesList from '../components/NotesList';
import SearchBar from '../components/SearchBar';
import { getActiveNotes, deleteNote, archiveNote } from '../utils/network-data';
import LanguageContext from '../contexts/LanguageContext';

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const keyword = searchParams.get('keyword') || '';
  const { locale } = useContext(LanguageContext);

  useEffect(() => {
    async function fetchNotes() {
      const { data } = await getActiveNotes();
      setNotes(data);
      setLoading(false);
    }
    fetchNotes();
  }, []);

  const onKeywordChangeHandler = (keyword) => {
    setSearchParams({ keyword });
  };

  const onDeleteHandler = async (id) => {
    await deleteNote(id);
    const { data } = await getActiveNotes();
    setNotes(data);
  };

  const onArchiveHandler = async (id) => {
    await archiveNote(id);
    const { data } = await getActiveNotes();
    setNotes(data);
  };

  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(keyword.toLowerCase());
  });

  return (
    <section className="homepage">
      <h2 >{locale === 'id' ? 'Catatan Aktif' : 'Active Notes'}</h2>
      <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
      {loading ? (
        <p className="loading-indicator">{locale === 'id' ? 'Memuat...' : 'Loading...'}</p>
      ) : (
        <NotesList notes={filteredNotes} onDelete={onDeleteHandler} onArchive={onArchiveHandler} />
      )}
      <div className="homepage__action">
        <Link to="/notes/new">
          <button className="action" type="button">
            <FiPlus />
          </button>
        </Link>
      </div>
    </section>
  );
}

export default HomePage;
