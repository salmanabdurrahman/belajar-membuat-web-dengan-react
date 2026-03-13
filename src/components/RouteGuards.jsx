import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useLocale } from "../contexts/LocaleContext";
import LoadingIndicator from "./LoadingIndicator";

function ProtectedRoute() {
  const { authUser, initializingAuth } = useAuth();
  const { dictionary } = useLocale();

  if (initializingAuth) {
    return <LoadingIndicator message={dictionary.status.authLoading} />;
  }

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

function PublicOnlyRoute() {
  const { authUser, initializingAuth } = useAuth();
  const { dictionary } = useLocale();

  if (initializingAuth) {
    return <LoadingIndicator message={dictionary.status.authLoading} />;
  }

  if (authUser) {
    return <Navigate to="/notes" replace />;
  }

  return <Outlet />;
}

export { ProtectedRoute, PublicOnlyRoute };
