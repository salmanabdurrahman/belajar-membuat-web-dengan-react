import React from "react";

function LoadingIndicator({ message }) {
  return (
    <div className="loading-indicator" role="status" aria-live="polite">
      <div className="loading-indicator__spinner" aria-hidden="true" />
      <p>{message}</p>
    </div>
  );
}

export default LoadingIndicator;
