import React from "react";
import { useLocale } from "../contexts/LocaleContext";
import { toLocaleCode } from "../utils/dictionaries";
import NoteItem from "./NoteItem";

function formatGroupHeader(groupKey, locale) {
  const [year, month] = groupKey.split("-");
  const date = new Date(Number(year), Number(month) - 1, 1);

  return date.toLocaleDateString(toLocaleCode(locale), {
    month: "long",
    year: "numeric",
  });
}

function NotesList({
  notes,
  onDelete,
  onArchive,
  searchKeyword,
  processingNoteId,
}) {
  const { locale, dictionary } = useLocale();
  const hasNotes = Array.isArray(notes) && notes.length > 0;

  if (!hasNotes) {
    return (
      <div className="notes-list" data-testid="notes-list">
        <p className="notes-list__empty-message" data-testid="notes-list-empty">
          {dictionary.notes.noNotes}
        </p>
      </div>
    );
  }

  const groupedNotes = notes.reduce((groups, note) => {
    const date = new Date(note.createdAt);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const groupKey = `${year}-${month}`;

    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }

    groups[groupKey].push(note);
    return groups;
  }, {});

  const sortedGroupKeys = Object.keys(groupedNotes).sort((a, b) =>
    b.localeCompare(a)
  );

  return (
    <div className="notes-list" data-testid="notes-list">
      {sortedGroupKeys.map((groupKey) => {
        const groupNotes = groupedNotes[groupKey];

        return (
          <section
            key={groupKey}
            className="notes-group"
            data-testid={`${groupKey}-group`}
          >
            <div className="notes-group__header">
              <h3 className="notes-group__title">
                {formatGroupHeader(groupKey, locale)}
              </h3>
              <span
                className="notes-group__count"
                data-testid={`${groupKey}-group-count`}
              >
                {groupNotes.length}
              </span>
            </div>
            <div className="notes-group__items">
              {groupNotes.map((note) => (
                <NoteItem
                  key={note.id}
                  note={note}
                  onDelete={onDelete}
                  onArchive={onArchive}
                  searchKeyword={searchKeyword}
                  isProcessing={processingNoteId === note.id}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export default NotesList;
