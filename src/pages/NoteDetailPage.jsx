import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  archiveNote,
  deleteNote,
  getNote,
  unarchiveNote,
} from "../utils/network-data.js";
import LoadingIndicator from "../components/LoadingIndicator";
import NoteActionButton from "../components/NoteActionButton";
import { useLocale } from "../contexts/LocaleContext";
import { extractNoteEntity, showFormattedDate } from "../utils";

function NoteDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { locale, dictionary } = useLocale();

  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function fetchNoteDetail() {
      setIsLoading(true);
      const response = await getNote(id);

      if (!isMounted) {
        return;
      }

      if (response.error || !response.data) {
        setErrorMessage(dictionary.notes.detailError);
        setNote(null);
        setIsLoading(false);
        return;
      }

      setNote(extractNoteEntity(response.data));
      setErrorMessage("");
      setIsLoading(false);
    }

    fetchNoteDetail();

    return () => {
      isMounted = false;
    };
  }, [dictionary.notes.detailError, id]);

  async function onDelete() {
    if (!note) {
      return;
    }

    setIsProcessing(true);
    const response = await deleteNote(note.id);

    if (response.error) {
      setErrorMessage(dictionary.notes.actionFailed);
      setIsProcessing(false);
      return;
    }

    navigate("/notes", { replace: true });
  }

  async function onToggleArchive() {
    if (!note) {
      return;
    }

    setIsProcessing(true);

    const response = note.archived
      ? await unarchiveNote(note.id)
      : await archiveNote(note.id);

    if (response.error) {
      setErrorMessage(dictionary.notes.actionFailed);
      setIsProcessing(false);
      return;
    }

    setNote((previousNote) => ({
      ...previousNote,
      archived: !previousNote.archived,
    }));
    setIsProcessing(false);
  }

  if (isLoading) {
    return <LoadingIndicator message={dictionary.notes.detailLoading} />;
  }

  if (!note) {
    return (
      <section className="detail-page detail-page--empty">
        <p>{errorMessage || dictionary.notes.detailError}</p>
        <Link to="/notes" className="detail-page__back-link">
          {dictionary.notes.backToNotes}
        </Link>
      </section>
    );
  }

  return (
    <section className="detail-page">
      <div className="detail-page__header">
        <Link to="/notes" className="detail-page__back-link">
          {dictionary.notes.backToNotes}
        </Link>
      </div>

      {errorMessage && <p className="detail-page__error">{errorMessage}</p>}

      <article className="detail-card">
        <h2>{note.title}</h2>
        <p className="detail-card__meta">
          {dictionary.notes.createdAt}:{" "}
          {showFormattedDate(note.createdAt, locale)}
        </p>
        <p className="detail-card__body">{note.body}</p>
      </article>

      <div className="detail-card__actions">
        <NoteActionButton
          variant="delete"
          onClick={onDelete}
          disabled={isProcessing}
        />
        <NoteActionButton
          variant={note.archived ? "unarchive" : "archive"}
          onClick={onToggleArchive}
          disabled={isProcessing}
        />
      </div>
    </section>
  );
}

export default NoteDetailPage;
