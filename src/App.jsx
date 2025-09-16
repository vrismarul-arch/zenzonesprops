import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/routes";
import { useState, useEffect } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(null); // null = checking

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    setLoggedIn(!!token); // true if token exists
  }, []);

  if (loggedIn === null) return null; // or a spinner while checking

  const handleLogin = () => setLoggedIn(true);
  const handleLogout = () => setLoggedIn(false);

  return (
    <BrowserRouter>
      <AppRoutes loggedIn={loggedIn} onLogin={handleLogin} onLogout={handleLogout} />
    </BrowserRouter>
  );
}

export default App;
