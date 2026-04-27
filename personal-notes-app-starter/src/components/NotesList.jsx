import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import NoteItem from './NoteItem';
import LanguageContext from '../contexts/LanguageContext';

function NotesList({ notes, onDelete, onArchive, onUnarchive }) {
  const { locale } = useContext(LanguageContext);

  if (notes.length === 0) {
    return (
      <section className="notes-list-empty">
        <p className="notes-list__empty-message">{locale === 'id' ? 'Tidak ada catatan' : 'No notes'}</p>
      </section>
    );
  }

  return (
    <section className="notes-list">
      {notes.map((note) => (
        <NoteItem key={note.id} id={note.id} onDelete={onDelete} onArchive={onArchive} onUnarchive={onUnarchive} {...note} />
      ))}
    </section>
  );
}

NotesList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    archived: PropTypes.bool.isRequired,
  })).isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func,
  onUnarchive: PropTypes.func,
};

export default NotesList;
