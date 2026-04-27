import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import parser from 'html-react-parser';
import { FiTrash2, FiArchive, FiInbox } from 'react-icons/fi';
import { showFormattedDate } from '../utils';
import LanguageContext from '../contexts/LanguageContext';

function NoteItem({ id, title, createdAt, body, archived, onDelete, onArchive, onUnarchive }) {
  const { locale } = useContext(LanguageContext);
  const displayTitle = title === 'untitled' || title === '(untitled)' || title === '(tak berjudul)' ? (locale === 'id' ? '(tak berjudul)' : '(untitled)') : title;

  return (
    <article className="note-item">
      <h3 className="note-item__title">
        <Link to={`/notes/${id}`} style={{ textDecoration: 'none' }}>{displayTitle}</Link>
      </h3>
      <p className="note-item__createdAt">{showFormattedDate(createdAt, locale)}</p>
      <div className="note-item__body">{parser(body)}</div>
      <div className="note-item__action">
        {archived ? (
          <button
            className="note-item__archive-button"
            onClick={() => onUnarchive(id)}
          >
            <FiInbox />
          </button>
        ) : (
          <button
            className="note-item__archive-button"
            onClick={() => onArchive(id)}
          >
            <FiArchive />
          </button>
        )}
        <button
          className="note-item__delete-button"
          onClick={() => onDelete(id)}
        >
          <FiTrash2 />
        </button>
      </div>
    </article>
  );
}

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func,
  onUnarchive: PropTypes.func,
};

export default NoteItem;
