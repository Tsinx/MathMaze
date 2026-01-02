import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { ProfilePage } from './pages/ProfilePage';
import { GamePage } from './pages/GamePage';
import { VictoryPage } from './pages/VictoryPage';
import { DefeatPage } from './pages/DefeatPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/victory" element={<VictoryPage />} />
        <Route path="/defeat" element={<DefeatPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
