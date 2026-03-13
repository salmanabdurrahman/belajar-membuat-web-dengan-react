import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useLocale } from "../contexts/LocaleContext";
import { useTheme } from "../contexts/ThemeContext";

function Navigation() {
  const { authUser, logout } = useAuth();
  const { locale, dictionary, toggleLocale } = useLocale();
  const { theme, toggleTheme } = useTheme();

  const nextThemeLabel =
    theme === "dark"
      ? dictionary.preference.themeLight
      : dictionary.preference.themeDark;
  const nextLocaleLabel =
    locale === "id"
      ? dictionary.preference.languageEN
      : dictionary.preference.languageID;

  return (
    <header className="top-bar">
      <div className="top-bar__left">
        <h1 className="top-bar__title">{dictionary.app.title}</h1>
        {authUser ? (
          <Link to="/notes" className="top-bar__link">
            {dictionary.app.myNotes}
          </Link>
        ) : (
          <>
            <Link to="/login" className="top-bar__link">
              {dictionary.auth.loginTitle}
            </Link>
            <Link to="/register" className="top-bar__link">
              {dictionary.auth.registerTitle}
            </Link>
          </>
        )}
      </div>
      <div className="top-bar__right">
        {authUser && (
          <span className="top-bar__user">
            {dictionary.app.welcome}, {authUser.name}
          </span>
        )}
        <button type="button" className="top-bar__button" onClick={toggleTheme}>
          {nextThemeLabel}
        </button>
        <button
          type="button"
          className="top-bar__button"
          onClick={toggleLocale}
        >
          {nextLocaleLabel}
        </button>
        {authUser && (
          <button
            type="button"
            className="top-bar__button top-bar__button--danger"
            onClick={logout}
          >
            {dictionary.actions.logout}
          </button>
        )}
      </div>
    </header>
  );
}

export default Navigation;
