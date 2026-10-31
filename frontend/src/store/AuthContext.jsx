import { createContext, useState } from "react";
import { useAuthVerifyQueryOptions ,useGetAuth} from "../hooks/useUserData";

export const AuthContext = createContext({
  data: {},
  isLoading: false,
  setAuthorization: (userId) => {},
});
export default function AuthContextProvider({ children }) {
   const { data, isLoading } = useAuthVerifyQueryOptions();
  const [auth, setAuth] = useState();
  function setAuthorization(userId) {
    console.log(userId);
    setAuth((prevState) => {
      return { ...prevState, userId };
    });
  }
  const ctxValue = { data, isLoading, setAuthorization };
  return (
    <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>
  );
}
