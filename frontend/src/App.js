import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppSelector from "./pages/AppSelector/AppSelector.jsx";
import Spotify from "./pages/Apps/Spotify/Spotify.jsx";
import Login from "./pages/Apps/Spotify/Login/Login.jsx";
import Instagram from "./pages/Apps/Instagram/Instagram.jsx";

global.BASE_API_URL = process.env.REACT_APP_API_BASE_URL;
global.SPOTIFY_LOGIN = process.env.REACT_APP_SPOTIFY_LOGIN;
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppSelector />} />
        <Route path="spotify" element={<Login />}></Route>
        <Route path="spotify/:username" element={<Spotify />} />
        <Route path="/instagram" element={<Instagram />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
