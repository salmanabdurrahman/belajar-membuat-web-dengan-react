import React from "react";
import NoteItem from "./NoteItem";

function formatGroupHeader(groupKey) {
  const [year, month] = groupKey.split("-");
  const date = new Date(Number(year), Number(month) - 1, 1);
  return date.toLocaleDateString("id-ID", { month: "long", year: "numeric" });
}

function NotesList({
  notes,
  onDelete,
  onArchive,
  dataTestId = "notes-list",
  searchKeyword,
}) {
  const hasNotes = Array.isArray(notes) && notes.length > 0;

  if (!hasNotes) {
    return (
      <div className="notes-list" data-testid={dataTestId}>
        <p
          className="notes-list__empty-message"
          data-testid={`${dataTestId}-empty`}
        >
          Tidak ada catatan
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
    <div className="notes-list" data-testid={dataTestId}>
      {sortedGroupKeys.map((groupKey) => {
        const groupNotes = groupedNotes[groupKey];
        return (
          <section
            key={groupKey}
            data-testid={`${groupKey}-group`}
            className="notes-group"
          >
            <h3>{formatGroupHeader(groupKey)}</h3>
            <span data-testid={`${groupKey}-group-count`}>
              {groupNotes.length} catatan
            </span>
            {groupNotes.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                onDelete={onDelete}
                onArchive={onArchive}
                searchKeyword={searchKeyword}
              />
            ))}
          </section>
        );
      })}
    </div>
  );
}

export default NotesList;
