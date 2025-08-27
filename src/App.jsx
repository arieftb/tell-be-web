import "./App.css";
import "./style/theme.css";
import "./style/responsive.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "./presentation/pages/RegisterPage.jsx";
import LoginPage from "./presentation/pages/LoginPage.jsx";
import HomePage from "./presentation/pages/HomePage.jsx";
import ThreadDetailPage from "./presentation/pages/ThreadDetailPage.jsx";
import ThreadSubmitPage from "./presentation/pages/ThreadSubmitPage.jsx";
import LeaderboardPage from "./presentation/pages/LeaderboardPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/threads/:threadId" element={<ThreadDetailPage />} />
        <Route path="/submit-thread" element={<ThreadSubmitPage />} />
        <Route path="/leaderboards" element={<LeaderboardPage />} />
        {/* Fallback to home page if no other route matches */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
