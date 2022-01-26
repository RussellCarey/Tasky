import ConsolePage from "./pages/Console/index";
import AuthPage from "./pages/Auth/index";
import HomePage from "./pages/Home/index";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ThemeState from "./context/theme/themeState";

function App() {
  return (
    <ThemeState>
      <>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/console/" element={<ConsolePage />} />
            <Route path="/auth/" element={<AuthPage />} />
          </Routes>
        </Router>
      </>
    </ThemeState>
  );
}

export default App;
