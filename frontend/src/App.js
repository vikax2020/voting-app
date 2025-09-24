import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import VotingPage from "./components/VotingPage";
import ResultsPage from "./components/ResultPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {/* Voting page will be /vote */}
        <Route path="/vote" element={<VotingPage/>}/>
        <Route path="/results" element={<ResultsPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
