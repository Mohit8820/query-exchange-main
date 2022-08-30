import { useCallback, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from "./contexts/auth-context";
import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import AllRoutes from "./AllRoutes";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  });

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  });

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <div className="App">
        <Router>
          <Navbar />
          <AllRoutes />
        </Router>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
