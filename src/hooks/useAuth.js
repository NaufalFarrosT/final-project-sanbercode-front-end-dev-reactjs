import { createContext } from "react";
import { useLocalStorage } from "./useLocalStorage";
export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [idUser, setIDUser] = useLocalStorage("idUser", null);
  const [token, setToken] = useLocalStorage("user", null);

  return (
    <AuthContext.Provider value={{ token, setToken, idUser, setIDUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};
