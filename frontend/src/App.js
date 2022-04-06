import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppSelector from "./pages/AppSelector/AppSelector.jsx";
import Spotify from "./pages/Apps/Spotify/Spotify.jsx";
import Login from "./pages/Apps/Spotify/Login/Login.jsx";
import Instagram from "./pages/Apps/Instagram/Instagram.jsx";
import CCalc from "./pages/Apps/CCalc/CCalc.jsx";

global.BASE_API_URL = process.env.REACT_APP_API_BASE_URL;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppSelector />} />
        <Route path="spotify" element={<Login />}></Route>
        <Route path="spotify/:username" element={<Spotify />} />
        <Route path="/instagram" element={<Instagram />} />
        <Route path="/ccalc" element={<CCalc />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
