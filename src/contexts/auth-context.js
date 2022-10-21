import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  token: null,
  userId: null,
  uname: null,
  uavatar: null,
  login: () => {},
  logout: () => {},
});
