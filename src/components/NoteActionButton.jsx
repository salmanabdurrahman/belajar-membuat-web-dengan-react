import React from "react";
import { useLocale } from "../contexts/LocaleContext";

function NoteActionButton({ variant, onClick, disabled = false }) {
  const { dictionary } = useLocale();

  const labelMap = {
    delete: dictionary.actions.delete,
    archive: dictionary.actions.archive,
    unarchive: dictionary.actions.unarchive,
  };

  if (!labelMap[variant]) {
    return null;
  }

  return (
    <button
      className={`note-item__button note-item__button--${variant}`}
      type="button"
      onClick={onClick}
      disabled={disabled}
      data-testid={`note-item-${variant}-button`}
    >
      {labelMap[variant]}
    </button>
  );
}

export default NoteActionButton;
