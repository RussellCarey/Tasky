import ConsolePage from "./pages/Console/index";
import AuthPage from "./pages/Auth/index";
import HomePage from "./pages/Home/index";
import AccountsPage from "./pages/Account";

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
            <Route path="/account" element={<AccountsPage />} />
          </Routes>
        </Router>
      </>
    </ThemeState>
  );
}

export default App;
