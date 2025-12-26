import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";


import MnemonicsList from "./modules/mnemonics/MnemonicsList";
import MnemonicDetail from "./modules/mnemonics/MnemonicDetail";
import AddMnemonic from "./modules/mnemonics/AddMnemonic";
import Flashcards from "./modules/flashcards/Flashcards";
import FlashcardFortress from "./modules/flashcards/FlashcardFortress";
import StudyPlanner from "./modules/planner/StudyPlanner";
import ProgressTracker from "./modules/progress/ProgressTracker";
import PracticeScenarios from "./modules/practice/PracticeScenarios";
import Dashboard from "./modules/dashboard/Dashboard";
import Resources from "./modules/resources/Resources";
import Community from "./modules/community/Community";
import Settings from "./modules/settings/Settings";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/mnemonics" element={<MnemonicsList />} />
        <Route path="/mnemonics/add" element={<AddMnemonic />} />
        <Route path="/mnemonics/:id" element={<MnemonicDetail />} />
        <Route path="/flashcards" element={<Flashcards />} />
        <Route path="/planner" element={<StudyPlanner />} />
        <Route path="/progress" element={<ProgressTracker />} />
        <Route path="/practice" element={<PracticeScenarios />} />
        
        <Route path="/community" element={<Community />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/resources" element={<Resources />} />
      </Routes>
    </Router>
  );
}

export default App;
