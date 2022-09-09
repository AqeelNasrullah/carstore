import React, { createContext, useContext, useEffect, useState } from "react";
import apiCall from "../config/apiCall";
import Loading from "../components/Loading";

const AuthContext = createContext({
  user: null,
  isAuthenticated: null,
  changeAuthState: (state) => {},
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loaded, setloaded] = useState(false);

  const changeAuthState = (state) => {
    setIsAuthenticated(state);
  };

  useEffect(() => {
    const getUser = async () => {
      await apiCall
        .get("/auth/user")
        .then((resp) => {
          setIsAuthenticated(true);
          setUser(resp.data);
          setloaded(true);
        })
        .catch((err) => {
          console.log(err);
          setloaded(true);
        });
    };

    getUser();
  }, [isAuthenticated]);

  if (!loaded)
    return (
      <div className="mt-5">
        <Loading />
      </div>
    );

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, changeAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
