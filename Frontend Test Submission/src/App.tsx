import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShortenPage from './pages/Shortpage';
import StatsPage from './pages/Statspage';
import RedirectPage from './pages/RedirectPge';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShortenPage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/:shortcode" element={<RedirectPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;