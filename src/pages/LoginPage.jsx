import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useLocale } from "../contexts/LocaleContext";
import useInput from "../hooks/useInput";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { dictionary } = useLocale();

  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const response = await login({ email, password });
    setIsSubmitting(false);

    if (response.error) {
      setErrorMessage(dictionary.auth.loginFailed);
      return;
    }

    navigate("/notes", { replace: true });
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-card__intro">
          <p className="auth-card__badge">{dictionary.app.title}</p>
          <h2>{dictionary.auth.loginTitle}</h2>
          <p className="auth-card__subtitle">{dictionary.auth.loginSubtitle}</p>
        </div>

        {errorMessage && <p className="auth-card__error">{errorMessage}</p>}

        <form className="auth-card__form" onSubmit={onSubmit}>
          <label htmlFor="email">{dictionary.auth.emailLabel}</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={onEmailChange}
            placeholder={dictionary.auth.emailPlaceholder}
            required
          />

          <label htmlFor="password">{dictionary.auth.passwordLabel}</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={onPasswordChange}
            placeholder={dictionary.auth.passwordPlaceholder}
            required
          />

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? dictionary.status.processing
              : dictionary.auth.loginButton}
          </button>
        </form>

        <p className="auth-card__switch">
          {dictionary.auth.noAccount}{" "}
          <Link to="/register">{dictionary.auth.goRegister}</Link>
        </p>
      </div>
    </section>
  );
}

export default LoginPage;
