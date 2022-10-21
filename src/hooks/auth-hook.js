import { useState, useCallback, useEffect } from "react";

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [uname, setUname] = useState(null);
  const [uavatar, setUavatar] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const login = useCallback((uid, uname, uavatar, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    setUname(uname);
    setUavatar(uavatar);
    //different variable than the state
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        uname: uname,
        uavatar: uavatar,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    setUname(null);
    setUavatar(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.uname,
        storedData.uavatar,
        storedData.token,

        new Date(storedData.expiration)
      );
    }
  }, [login]);

  return { token, login, logout, userId, uname, uavatar };
};
