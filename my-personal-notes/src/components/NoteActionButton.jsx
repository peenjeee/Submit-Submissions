import React from 'react';

function NoteActionButton({ variant, onClick }) {
  const isDelete = variant === 'delete';
  const className = isDelete
    ? 'note-item__delete-button'
    : 'note-item__archive-button';
  const testId = isDelete
    ? 'note-item-delete-button'
    : 'note-item-archive-button';

  return (
    <button
      className={className}
      type="button"
      onClick={onClick}
      data-testid={testId}
    >
      {isDelete ? 'Delete' : variant === 'archive' ? 'Arsipkan' : 'Aktifkan'}
    </button>
  );
}

export default NoteActionButton;
