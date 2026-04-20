import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiTrash2, FiArchive, FiInbox } from "react-icons/fi";
import { getNote, deleteNote, archiveNote, unarchiveNote } from "../utils/local-data";
import NoteDetail from "../components/NoteDetail";

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const note = getNote(id);

  if (!note) {
    return (
      <section className="detail-page">
        <p>Catatan tidak ditemukan</p>
      </section>
    );
  }

  function onDeleteHandler() {
    deleteNote(id);
    navigate("/");
  }

  function onArchiveHandler() {
    archiveNote(id);
    navigate("/archives");
  }

  function onUnarchiveHandler() {
    unarchiveNote(id);
    navigate("/");
  }

  return (
    <section>
      <NoteDetail
        title={note.title}
        createdAt={note.createdAt}
        body={note.body}
      />
      <div className="detail-page__action">
        {note.archived ? (
          <button
            className="action"
            type="button"
            title="Aktifkan"
            onClick={onUnarchiveHandler}
          >
            <FiInbox />
          </button>
        ) : (
          <button
            className="action"
            type="button"
            title="Arsipkan"
            onClick={onArchiveHandler}
          >
            <FiArchive />
          </button>
        )}
        <button
          className="action"
          type="button"
          title="Hapus"
          onClick={onDeleteHandler}
        >
          <FiTrash2 />
        </button>
      </div>
    </section>
  );
}

export default DetailPage;
