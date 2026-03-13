import React, { useState } from "react";
import { useLocale } from "../contexts/LocaleContext";

const TITLE_CHAR_LIMIT = 50;
const BODY_MIN_LENGTH = 10;

function NoteInput({ onAddNote, isSubmitting }) {
  const { dictionary } = useLocale();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const remainingChars = TITLE_CHAR_LIMIT - title.length;
  const trimmedBody = body.trim();
  const hasBodyError =
    (submitted || body.length > 0) && trimmedBody.length < BODY_MIN_LENGTH;

  function onTitleChange(event) {
    const value = event.target.value;
    if (value.length <= TITLE_CHAR_LIMIT) {
      setTitle(value);
    }
  }

  function onBodyChange(event) {
    setBody(event.target.value);
  }

  async function onSubmit(event) {
    event.preventDefault();
    setSubmitted(true);

    if (!title.trim() || trimmedBody.length < BODY_MIN_LENGTH) {
      return;
    }

    const result = await onAddNote({
      title: title.trim(),
      body: trimmedBody,
    });

    if (result?.error) {
      return;
    }

    setTitle("");
    setBody("");
    setSubmitted(false);
  }

  return (
    <div className="note-input" data-testid="note-input">
      <h2>{dictionary.notes.createTitle}</h2>
      {hasBodyError && (
        <p className="note-input__feedback--error">
          {dictionary.notes.minBodyError}
        </p>
      )}
      <form onSubmit={onSubmit} data-testid="note-input-form">
        <p
          className="note-input__title__char-limit"
          data-testid="note-input-title-remaining"
        >
          {remainingChars} {dictionary.notes.titleRemaining}
        </p>
        <input
          className="note-input__title"
          type="text"
          placeholder={dictionary.notes.titlePlaceholder}
          value={title}
          onChange={onTitleChange}
          required
          data-testid="note-input-title-field"
        />
        <textarea
          className="note-input__body"
          placeholder={dictionary.notes.bodyPlaceholder}
          value={body}
          onChange={onBodyChange}
          required
          data-testid="note-input-body-field"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          data-testid="note-input-submit-button"
        >
          {isSubmitting
            ? dictionary.status.processing
            : dictionary.notes.submitButton}
        </button>
      </form>
    </div>
  );
}

export default NoteInput;
