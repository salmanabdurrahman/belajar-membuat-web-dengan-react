import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  getAccessToken,
  getUserLogged,
  login as loginApi,
  putAccessToken,
  register as registerApi,
} from "../utils/network-data.js";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [initializingAuth, setInitializingAuth] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function bootstrapAuth() {
      const token = getAccessToken();
      if (!token) {
        if (isMounted) {
          setInitializingAuth(false);
        }
        return;
      }

      const response = await getUserLogged();
      if (!isMounted) {
        return;
      }

      if (response.error) {
        localStorage.removeItem("accessToken");
        setAuthUser(null);
      } else {
        setAuthUser(response.data);
      }

      setInitializingAuth(false);
    }

    bootstrapAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  async function login({ email, password }) {
    const response = await loginApi({ email, password });

    if (response.error) {
      return { error: true };
    }

    putAccessToken(response.data.accessToken);
    const userResponse = await getUserLogged();

    if (userResponse.error) {
      localStorage.removeItem("accessToken");
      setAuthUser(null);
      return { error: true };
    }

    setAuthUser(userResponse.data);
    return { error: false };
  }

  async function register({ name, email, password }) {
    const response = await registerApi({ name, email, password });
    return { error: response.error };
  }

  function logout() {
    localStorage.removeItem("accessToken");
    setAuthUser(null);
  }

  const contextValue = useMemo(
    () => ({
      authUser,
      initializingAuth,
      isAuthenticated: Boolean(authUser),
      login,
      register,
      logout,
    }),
    [authUser, initializingAuth]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };
