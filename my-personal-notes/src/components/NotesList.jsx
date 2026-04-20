import React from 'react';
import NoteItem from './NoteItem';

function NotesList({ notes, onDelete, onArchive, dataTestId = 'notes-list', searchKeyword }) {
  const hasNotes = Array.isArray(notes) && notes.length > 0;

  if (!hasNotes) {
    return (
      <div className="notes-list" data-testid={dataTestId}>
        <div data-testid={`${dataTestId}-empty`} className="notes-list__empty-message">
          Tidak ada catatan
        </div>
      </div>
    );
  }

  const groupedNotes = {};
  notes.forEach((note) => {
    const date = new Date(note.createdAt);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const groupKey = `${year}-${month}`;
    if (!groupedNotes[groupKey]) {
      groupedNotes[groupKey] = [];
    }
    groupedNotes[groupKey].push(note);
  });

  const formatGroupHeader = (groupKey) => {
    const [year, month] = groupKey.split('-');
    const date = new Date(Number(year), Number(month) - 1);
    return date.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="notes-list notes-list--grouped" data-testid={dataTestId}>
      {Object.entries(groupedNotes).map(([groupKey, notes]) => (
        <section key={groupKey} data-testid={`${groupKey}-group`} className="notes-group">
          <div className="notes-group__header">
            <h3>{formatGroupHeader(groupKey)}</h3>
            <span data-testid={`${groupKey}-group-count`}>{notes.length} catatan</span>
          </div>
          <div className="notes-group__items">
            {notes.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                onDelete={onDelete}
                onArchive={onArchive}
                searchKeyword={searchKeyword}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default NotesList;
