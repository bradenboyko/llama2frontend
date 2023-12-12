import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Topbar from "./components/Topbar";
import Chat from './components/Chat';
import Models from './components/Models';

const App = () => {

  const savedTheme = localStorage.getItem('theme') || 'dark';
  const [theme, setTheme] = useState(savedTheme);

  useEffect(() => {
    const themeColorMeta = document.getElementById('theme-color-meta');

    if (theme === "dark") {

      document.documentElement.style.background = "rgb(52, 53, 65)";
      themeColorMeta?.setAttribute('content', 'rgb(52, 53, 65)');
      document.documentElement.style.setProperty('--main_text_color', 'white');

      document.documentElement.style.setProperty('--shade100', 'rgb(76, 79, 95)');
      document.documentElement.style.setProperty('--shade200', 'rgb(32, 33, 35)');
      document.documentElement.style.setProperty('--shade400', 'rgb(52, 53, 65)');
      document.documentElement.style.setProperty('--shade700', 'rgb(68, 70, 84)');
    } else if (theme === "light") {
      
      document.documentElement.style.background = "white";
      themeColorMeta?.setAttribute('content', 'white');
      document.documentElement.style.setProperty('--main_text_color', 'black');
      
      document.documentElement.style.setProperty('--shade100', 'rgb(200, 200, 200)');
      document.documentElement.style.setProperty('--shade200', 'rgb(220, 220, 220)');
      document.documentElement.style.setProperty('--shade400', 'white');
      document.documentElement.style.setProperty('--shade700', 'rgb(220, 220, 220)');
    }
  }, [theme]);

  return (
    <>
    <BrowserRouter>
      <Topbar theme={theme} setTheme={setTheme}/>

      <Routes>
        <Route path="/" exact element={<Navigate to="/chat"/>}/>
        <Route path="/chat" exact element={<Chat/>}/>
        <Route path="/models" exact element={<Models/>}/>
        <Route path="*" exact element={<Navigate to="/chat"/>}/>
      </Routes>
    
    </BrowserRouter>
    </>
  );
}

export default App;