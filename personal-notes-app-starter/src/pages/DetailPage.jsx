import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NoteDetail from '../components/NoteDetail';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/network-data';
import LanguageContext from '../contexts/LanguageContext';
import NotFoundPage from './NotFoundPage';
import { FiTrash2, FiArchive, FiInbox } from 'react-icons/fi';

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const { locale } = useContext(LanguageContext);

  useEffect(() => {
    async function fetchNote() {
      const { data } = await getNote(id);
      setNote(data);
      setLoading(false);
    }
    fetchNote();
  }, [id]);

  const onDeleteHandler = async () => {
    await deleteNote(id);
    navigate('/');
  };

  const onArchiveHandler = async () => {
    await archiveNote(id);
    navigate('/');
  };

  const onUnarchiveHandler = async () => {
    await unarchiveNote(id);
    navigate('/');
  };

  if (loading) {
    return <p className="loading-indicator">{locale === 'id' ? 'Memuat...' : 'Loading...'}</p>;
  }

  if (!note) {
    return <NotFoundPage />;
  }

  return (
    <section className="detail-page">
      <NoteDetail {...note} />
      <div className="detail-page__action">
        {note.archived ? (
          <button className="action" onClick={onUnarchiveHandler}>
            <FiInbox />
          </button>
        ) : (
          <button className="action" onClick={onArchiveHandler}>
            <FiArchive />
          </button>
        )}
        <button className="action" onClick={onDeleteHandler}>
          <FiTrash2 />
        </button>
      </div>
    </section>
  );
}

export default DetailPage;
