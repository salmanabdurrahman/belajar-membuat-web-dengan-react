import React from "react";
import { useLocale } from "../contexts/LocaleContext";

function NoteSearch({ searchKeyword, onSearch }) {
  const { dictionary } = useLocale();

  return (
    <div className="note-search" data-testid="note-search">
      <label htmlFor="note-search-input" className="note-search__label">
        {dictionary.notes.searchPlaceholder}
      </label>
      <input
        id="note-search-input"
        className="note-search__input"
        type="text"
        placeholder={dictionary.notes.searchPlaceholder}
        value={searchKeyword}
        onChange={(event) => onSearch(event.target.value)}
        data-testid="note-search-input"
      />
    </div>
  );
}

export default NoteSearch;
