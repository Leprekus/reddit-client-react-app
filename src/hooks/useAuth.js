import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import randomstring from 'randomstring'
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, _setToken] = useLocalStorage("token", null);
  const [randString, setRandstring] = useLocalStorage('RANDOM_STRING', randomstring.generate())
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async (data) => {
    _setToken(data);
    navigate("/homePage");
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