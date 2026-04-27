import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import NotesList from '../components/NotesList';
import SearchBar from '../components/SearchBar';
import { getArchivedNotes, deleteNote, unarchiveNote } from '../utils/network-data';
import LanguageContext from '../contexts/LanguageContext';

function ArchivePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const keyword = searchParams.get('keyword') || '';
  const { locale } = useContext(LanguageContext);

  useEffect(() => {
    async function fetchNotes() {
      const { data } = await getArchivedNotes();
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
    const { data } = await getArchivedNotes();
    setNotes(data);
  };

  const onUnarchiveHandler = async (id) => {
    await unarchiveNote(id);
    const { data } = await getArchivedNotes();
    setNotes(data);
  };

  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(keyword.toLowerCase());
  });

  return (
    <section className="archives-page">
      <h2>{locale === 'id' ? 'Catatan Arsip' : 'Archived Notes'}</h2>
      <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
      {loading ? (
        <p className="loading-indicator">{locale === 'id' ? 'Memuat...' : 'Loading...'}</p>
      ) : (
        <NotesList notes={filteredNotes} onDelete={onDeleteHandler} onUnarchive={onUnarchiveHandler} />
      )}
    </section>
  );
}

export default ArchivePage;
