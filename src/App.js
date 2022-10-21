import { useAuth } from "./hooks/auth-hook";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from "./contexts/auth-context";
import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import AllRoutes from "./AllRoutes";
import LeftSidebar from "./components/LeftSidebar/LeftSidebar";

function App() {
  const { token, login, logout, userId, uname, uavatar } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        uname: uname,
        uavatar: uavatar,
        login: login,
        logout: logout,
      }}
    >
      <div className="App">
        <Router>
          <Navbar />
          <div className="main">
            <div className="pc-view left-panel-container">
              <LeftSidebar />
            </div>
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
