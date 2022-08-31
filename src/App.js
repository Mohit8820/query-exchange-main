import { useAuth } from "./hooks/auth-hook";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from "./contexts/auth-context";
import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import AllRoutes from "./AllRoutes";
import LeftSidebar from "./components/LeftSidebar/LeftSidebar";

function App() {
  const { token, login, logout, userId } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <div className="App">
        <Router>
          <Navbar />
          <div className="main">
            <LeftSidebar />
            <main>
              <AllRoutes />
            </main>
          </div>
        </Router>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
