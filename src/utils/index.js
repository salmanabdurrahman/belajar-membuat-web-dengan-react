import { toLocaleCode } from "./dictionaries";

function showFormattedDate(date, locale = "id") {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Date(date).toLocaleDateString(toLocaleCode(locale), options);
}

function sortNotesByDateDesc(notes) {
  return [...notes].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
}

function normalizeNote(rawNote = {}) {
  return {
    id: rawNote.id ?? rawNote.noteId ?? String(Date.now()),
    title: rawNote.title ?? "",
    body: rawNote.body ?? "",
    createdAt: rawNote.createdAt ?? new Date().toISOString(),
    archived: Boolean(rawNote.archived),
  };
}

function extractNoteEntity(payload, fallback = {}) {
  if (!payload) {
    return normalizeNote(fallback);
  }

  if (payload.note) {
    return normalizeNote(payload.note);
  }

  return normalizeNote({ ...fallback, ...payload });
}

function includesKeyword(note, keyword) {
  if (!keyword) {
    return true;
  }

  const loweredKeyword = keyword.toLowerCase();
  return (
    note.title.toLowerCase().includes(loweredKeyword) ||
    note.body.toLowerCase().includes(loweredKeyword)
  );
}

export {
  showFormattedDate,
  sortNotesByDateDesc,
  normalizeNote,
  extractNoteEntity,
  includesKeyword,
};
