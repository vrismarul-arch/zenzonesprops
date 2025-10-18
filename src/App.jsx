import { BrowserRouter, useLocation } from "react-router-dom";
import AppRoutes from "./routes/routes";
import { useState, useEffect } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(null);

  // --- Check login token ---
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    setLoggedIn(!!token);
  }, []);


  if (loggedIn === null) return null;

  const handleLogin = () => setLoggedIn(true);
  const handleLogout = () => setLoggedIn(false);

  return (
    <BrowserRouter>
      <AppRoutes loggedIn={loggedIn} onLogin={handleLogin} onLogout={handleLogout} />
    </BrowserRouter>
  );
}

export default App;
