import React from "react";
import { Link } from "react-router-dom";
import { useLocale } from "../contexts/LocaleContext";
import { showFormattedDate } from "../utils";
import NoteActionButton from "./NoteActionButton";

function escapeKeyword(keyword) {
  return keyword.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&");
}

function highlightText(text, keyword) {
  if (!keyword) {
    return text;
  }

  const regex = new RegExp(`(${escapeKeyword(keyword)})`, "gi");

  return text
    .split(regex)
    .map((part, index) =>
      part.toLowerCase() === keyword.toLowerCase() ? (
        <mark key={`${part}-${index}`}>{part}</mark>
      ) : (
        part
      )
    );
}

function NoteItem({ note, onDelete, onArchive, searchKeyword, isProcessing }) {
  const { locale } = useLocale();

  return (
    <article
      className="note-item"
      data-testid="note-item"
      data-note-id={note?.id}
    >
      <Link
        to={`/notes/${note.id}`}
        className="note-item__content"
        data-testid="note-item-content"
      >
        <h3 className="note-item__title" data-testid="note-item-title">
          {highlightText(note.title, searchKeyword)}
        </h3>
        <p className="note-item__date" data-testid="note-item-date">
          {showFormattedDate(note.createdAt, locale)}
        </p>
        <p className="note-item__body" data-testid="note-item-body">
          {highlightText(note.body, searchKeyword)}
        </p>
      </Link>
      <div className="note-item__action" data-testid="note-item-action">
        <NoteActionButton
          variant="delete"
          onClick={() => onDelete(note.id)}
          disabled={isProcessing}
        />
        <NoteActionButton
          variant={note.archived ? "unarchive" : "archive"}
          onClick={() => onArchive(note.id, note.archived)}
          disabled={isProcessing}
        />
      </div>
    </article>
  );
}

export default NoteItem;
