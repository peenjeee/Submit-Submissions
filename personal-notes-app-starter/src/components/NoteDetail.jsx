import React from "react";
import PropTypes from "prop-types";
import parser from "html-react-parser";
import { showFormattedDate } from "../utils";

function NoteDetail({ title, createdAt, body }) {
  return (
    <div className="detail-page">
      <h2 className="detail-page__title">{title}</h2>
      <p className="detail-page__createdAt">{showFormattedDate(createdAt)}</p>
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
