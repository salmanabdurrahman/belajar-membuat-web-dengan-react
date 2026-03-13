import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  addNote,
  archiveNote,
  deleteNote,
  getActiveNotes,
  getArchivedNotes,
  unarchiveNote,
} from "../utils/network-data.js";
import NoteInput from "../components/NoteInput";
import NoteSearch from "../components/NoteSearch";
import NotesList from "../components/NotesList";
import LoadingIndicator from "../components/LoadingIndicator";
import { useLocale } from "../contexts/LocaleContext";
import {
  extractNoteEntity,
  includesKeyword,
  normalizeNote,
  sortNotesByDateDesc,
} from "../utils";

function NotesPage() {
  const { dictionary } = useLocale();

  const [activeNotes, setActiveNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);

  const [searchKeyword, setSearchKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [processingNoteId, setProcessingNoteId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const loadNotes = useCallback(
    async (showGlobalLoader = true) => {
      if (showGlobalLoader) {
        setIsLoading(true);
      }

      const [activeResponse, archivedResponse] = await Promise.all([
        getActiveNotes(),
        getArchivedNotes(),
      ]);

      if (activeResponse.error || archivedResponse.error) {
        setErrorMessage(dictionary.notes.loadError);
        if (showGlobalLoader) {
          setIsLoading(false);
        }
        return false;
      }

      const normalizedActiveNotes = activeResponse.data.map((note) =>
        normalizeNote(note)
      );
      const normalizedArchivedNotes = archivedResponse.data.map((note) =>
        normalizeNote(note)
      );

      setActiveNotes(sortNotesByDateDesc(normalizedActiveNotes));
      setArchivedNotes(sortNotesByDateDesc(normalizedArchivedNotes));
      setErrorMessage("");

      if (showGlobalLoader) {
        setIsLoading(false);
      }

      return true;
    },
    [dictionary.notes.loadError]
  );

  useEffect(() => {
    let isMounted = true;

    async function bootstrapNotes() {
      const loaded = await loadNotes(true);
      if (!isMounted) {
        return;
      }

      if (!loaded) {
        setIsLoading(false);
      }
    }

    bootstrapNotes();

    return () => {
      isMounted = false;
    };
  }, [loadNotes]);

  async function onAddNoteHandler(noteInput) {
    setIsSubmitting(true);
    setErrorMessage("");

    const response = await addNote(noteInput);
    setIsSubmitting(false);

    if (response.error) {
      setErrorMessage(dictionary.notes.addFailed);
      return { error: true };
    }

    const createdNote = extractNoteEntity(response.data, {
      ...noteInput,
      archived: false,
    });

    setActiveNotes((previousNotes) =>
      sortNotesByDateDesc([
        createdNote,
        ...previousNotes.filter((note) => note.id !== createdNote.id),
      ])
    );

    return { error: false };
  }

  async function onDeleteHandler(id) {
    setProcessingNoteId(id);
    setErrorMessage("");

    const response = await deleteNote(id);

    if (response.error) {
      setErrorMessage(dictionary.notes.actionFailed);
      setProcessingNoteId(null);
      return;
    }

    setActiveNotes((previousNotes) =>
      previousNotes.filter((note) => note.id !== id)
    );
    setArchivedNotes((previousNotes) =>
      previousNotes.filter((note) => note.id !== id)
    );
    setProcessingNoteId(null);
  }

  async function onArchiveHandler(id, isArchived) {
    setProcessingNoteId(id);
    setErrorMessage("");

    const response = isArchived
      ? await unarchiveNote(id)
      : await archiveNote(id);

    if (response.error) {
      setErrorMessage(dictionary.notes.actionFailed);
      setProcessingNoteId(null);
      return;
    }

    await loadNotes(false);
    setProcessingNoteId(null);
  }

  const filteredActiveNotes = useMemo(
    () => activeNotes.filter((note) => includesKeyword(note, searchKeyword)),
    [activeNotes, searchKeyword]
  );

  const filteredArchivedNotes = useMemo(
    () => archivedNotes.filter((note) => includesKeyword(note, searchKeyword)),
    [archivedNotes, searchKeyword]
  );
  const totalNotes = activeNotes.length + archivedNotes.length;

  if (isLoading) {
    return <LoadingIndicator message={dictionary.notes.loading} />;
  }

  return (
    <div className="note-app" data-testid="note-app">
      <div className="note-app__header" data-testid="note-app-header">
        <div className="note-app__header-meta">
          <h2>{dictionary.app.myNotes}</h2>
          <p>
            {totalNotes} {dictionary.notes.totalLabel}
          </p>
        </div>
        <NoteSearch searchKeyword={searchKeyword} onSearch={setSearchKeyword} />
      </div>

      <div
        className="note-app__body note-app__layout"
        data-testid="note-app-body"
      >
        <aside className="note-app__composer">
          <NoteInput onAddNote={onAddNoteHandler} isSubmitting={isSubmitting} />
        </aside>

        <div className="note-app__lists">
          {errorMessage && (
            <div className="note-alert note-alert--error" role="alert">
              <p>{errorMessage}</p>
              <button type="button" onClick={() => loadNotes(true)}>
                {dictionary.actions.retry}
              </button>
            </div>
          )}

          <section
            className="notes-panel"
            aria-labelledby="active-notes-title"
            data-testid="active-notes-section"
          >
            <h2 id="active-notes-title">{dictionary.notes.activeHeading}</h2>
            <NotesList
              notes={filteredActiveNotes}
              onDelete={onDeleteHandler}
              onArchive={onArchiveHandler}
              searchKeyword={searchKeyword}
              processingNoteId={processingNoteId}
            />
          </section>

          <section
            className="notes-panel"
            aria-labelledby="archived-notes-title"
            data-testid="archived-notes-section"
          >
            <h2 id="archived-notes-title">
              {dictionary.notes.archivedHeading}
            </h2>
            <NotesList
              notes={filteredArchivedNotes}
              onDelete={onDeleteHandler}
              onArchive={onArchiveHandler}
              searchKeyword={searchKeyword}
              processingNoteId={processingNoteId}
            />
          </section>
        </div>
      </div>
    </div>
  );
}

export default NotesPage;
