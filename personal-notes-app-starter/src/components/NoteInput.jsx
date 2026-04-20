import React, { useState } from "react";
import PropTypes from "prop-types";
import { FiCheck } from "react-icons/fi";

function NoteInput({ addNote }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const onTitleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const onBodyInputHandler = (event) => {
    setBody(event.target.innerHTML);
  };

  const onSubmitHandler = () => {
    addNote({ title, body });
  };

  return (
    <div className="add-new-page__input">
      <input
        className="add-new-page__input__title"
        type="text"
        placeholder="Judul catatan ..."
        value={title}
        onChange={onTitleChangeHandler}
      />
      <div
        className="add-new-page__input__body"
        data-placeholder="Isi catatan ..."
        contentEditable
        onInput={onBodyInputHandler}
      />
      <div className="add-new-page__action">
        <button className="action" type="button" title="Simpan" onClick={onSubmitHandler}>
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
