import { useEffect } from "react";
import ConsolePage from "./pages/console";
import AuthPage from "./pages/auth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import useDarkMode from "./hooks/useDarkMode";

function App() {
  const [theme, setDarkMode] = useDarkMode();

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ConsolePage theme={theme} setDarkMode={setDarkMode} />} />
          <Route path="/auth/" element={<AuthPage theme={theme} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
