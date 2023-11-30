import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import '../styles.css';
import Sidebar from './Sidebar';

const Topbar = ( props ) => {
    const { theme, setTheme } = props;

    const navigate = useNavigate();
    const [sidebar, setSidebar] = useState(false);

    // handles theme change
    const toggleTheme = () => {
        if (theme === "dark") {
            setTheme("light");
            localStorage.setItem('theme', "light");
        } else {
            setTheme("dark");
            localStorage.setItem('theme', "dark");
        }
    };

    // adds border bottom to topbar when scrolled down
    window.addEventListener("scroll", function() {
        var topbar = document.querySelector(".topbar");
        if (topbar && window.pageYOffset > 30) {
            topbar.classList.add("topbar-scrolled");
        } else {
            topbar.classList.remove("topbar-scrolled");
        }
    });

    // opens and closes sidebar
    const showSidebar = () => {
        if (sidebar) {
            // sidebar closes
            document.body.classList.remove("sidebar_slide_slide");
            setSidebar(!sidebar);
        } else {
            // sidebar opens
            document.body.classList.add("sidebar_slide_slide");
            setSidebar(!sidebar);
        }
    }

    // closes sidebar on navigate
    useEffect(() => {
        if (sidebar) {
            document.body.classList.remove("sidebar_slide_slide");
            setSidebar(!sidebar);
        }
    }, [navigate]);

    return (
        <>
        <header className="topbar">
            <div className="topbar_content">
                <button type="button" className="topbar_menu_button" id="topbar_menu_button"><i className="material-symbols-outlined" onClick={showSidebar}>menu</i></button>

                <button type="button" className="topbar_button" onClick={toggleTheme}><i className="material-symbols-outlined">{theme === "dark" ? "bedtime" : "wb_sunny"}</i></button>
            </div>
        </header>

        <Sidebar theme={theme} sidebar={sidebar} showSidebar={showSidebar}/>
        </>
  )
}

export default Topbar;