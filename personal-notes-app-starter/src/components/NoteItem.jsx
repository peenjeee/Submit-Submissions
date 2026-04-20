import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FiTrash2, FiArchive, FiInbox } from "react-icons/fi";
import { showFormattedDate } from "../utils";
import parser from "html-react-parser";

function NoteItem({ id, title, body, createdAt, archived, onDelete, onArchive, onUnarchive }) {
  return (
    <div className="note-item">
      <h3 className="note-item__title">
        <Link to={`/notes/${id}`} style={{ textDecoration: "none" }}>{title}</Link>
      </h3>
      <p className="note-item__createdAt">{showFormattedDate(createdAt)}</p>
      <div className="note-item__body">{parser(body)}</div>
      <div className="note-item__action">
        <button
          className="note-item__delete-button"
          onClick={() => onDelete(id)}
          title="Hapus"
        >
          <FiTrash2 />
        </button>
        {archived ? (
          <button
            className="note-item__unarchive-button"
            onClick={() => onUnarchive(id)}
            title="Aktifkan"
          >
            <FiInbox />
          </button>
        ) : (
          <button
            className="note-item__archive-button"
            onClick={() => onArchive(id)}
            title="Arsipkan"
          >
            <FiArchive />
          </button>
        )}
      </div>
    </div>
  );
}

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func,
  onUnarchive: PropTypes.func,
};

export default NoteItem;
