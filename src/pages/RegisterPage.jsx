import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useLocale } from "../contexts/LocaleContext";
import useInput from "../hooks/useInput";

function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { dictionary } = useLocale();

  const [name, onNameChange] = useInput("");
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  const [confirmPassword, onConfirmPasswordChange] = useInput("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function onSubmit(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage(dictionary.auth.passwordMismatch);
      setSuccessMessage("");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    const response = await register({ name, email, password });

    setIsSubmitting(false);

    if (response.error) {
      setErrorMessage(dictionary.auth.registerFailed);
      return;
    }

    setSuccessMessage(dictionary.auth.registerSuccess);
    setTimeout(() => navigate("/login", { replace: true }), 700);
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-card__intro">
          <p className="auth-card__badge">{dictionary.app.title}</p>
          <h2>{dictionary.auth.registerTitle}</h2>
          <p className="auth-card__subtitle">
            {dictionary.auth.registerSubtitle}
          </p>
        </div>

        {errorMessage && <p className="auth-card__error">{errorMessage}</p>}
        {successMessage && (
          <p className="auth-card__success">{successMessage}</p>
        )}

        <form className="auth-card__form" onSubmit={onSubmit}>
          <label htmlFor="name">{dictionary.auth.nameLabel}</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={onNameChange}
            placeholder={dictionary.auth.namePlaceholder}
            required
          />

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

          <label htmlFor="confirm-password">
            {dictionary.auth.confirmPasswordLabel}
          </label>
          <input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={onConfirmPasswordChange}
            placeholder={dictionary.auth.confirmPasswordPlaceholder}
            required
          />

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? dictionary.status.processing
              : dictionary.auth.registerButton}
          </button>
        </form>

        <p className="auth-card__switch">
          {dictionary.auth.hasAccount}{" "}
          <Link to="/login">{dictionary.auth.goLogin}</Link>
        </p>
      </div>
    </section>
  );
}

export default RegisterPage;
