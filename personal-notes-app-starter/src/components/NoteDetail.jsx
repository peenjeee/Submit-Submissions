import React, { useContext } from "react";
import PropTypes from "prop-types";
import parser from "html-react-parser";
import { showFormattedDate } from "../utils";
import LanguageContext from '../contexts/LanguageContext';

function NoteDetail({ title, createdAt, body }) {
  const { locale } = useContext(LanguageContext);

  return (
    <div className="detail-page">
      <h2 className="detail-page__title">{((title === 'untitled' || title === '(untitled)' || title === '(tak berjudul)') && title) ? (locale === 'id' ? '(tak berjudul)' : '(untitled)') : title}</h2>
      <p className="detail-page__createdAt">{showFormattedDate(createdAt, locale)}</p>
      <div className="detail-page__body">{parser(body)}</div>
    </div>
  );
}

NoteDetail.propTypes = {
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

export default NoteDetail;
