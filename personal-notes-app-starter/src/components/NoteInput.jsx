import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { FiCheck } from 'react-icons/fi';
import LanguageContext from '../contexts/LanguageContext';
import useInput from '../hooks/useInput';

function NoteInput({ addNote }) {
  const [title, onTitleChangeEventHandler] = useInput('');
  const [body, setBody] = useState('');
  const { locale } = useContext(LanguageContext);

  const onBodyInputEventHandler = (event) => {
    setBody(event.target.innerHTML);
  };

  const onSubmitEventHandler = () => {
    addNote({ title, body });
  };

  return (
    <div className="add-new-page__input">
      <input
        className="add-new-page__input__title"
        placeholder={locale === 'id' ? 'Judul Catatan ...' : 'Note Title ...'}
        value={title}
        onChange={onTitleChangeEventHandler}
      />
      <div
        className="add-new-page__input__body"
        contentEditable
        data-placeholder={locale === 'id' ? 'Isi catatanmu disini ...' : 'Write your notes here ...'}
        onInput={onBodyInputEventHandler}
      />
      <div className="add-new-page__action">
        <button className="action" type="button" onClick={onSubmitEventHandler}>
          <FiCheck />
        </button>
      </div>
    </div>
  );
}

NoteInput.propTypes = {
  addNote: PropTypes.func.isRequired,
};

export default NoteInput;
