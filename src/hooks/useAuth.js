import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import randomstring from 'randomstring'
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  // call this function when you want to authenticate the user
  const login = async (data) => {
    _setToken(data);
    navigate("/homepage");
  };

  // call this function to sign out logged in user
  const logout = () => {
    _setToken(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      token,
      randString,
      login,
      logout
    }),
    [token]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};