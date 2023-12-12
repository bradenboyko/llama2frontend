import React from "react";
import { useNavigate } from 'react-router-dom';

import '../styles.css';

const Sidebar = ( props ) => {
    const { theme, sidebar, showSidebar } = props;

    const navigate = useNavigate();

    return (
        <>        
        <nav className={sidebar ? "sidebar sidebar_active" : "sidebar"}>

            {/*<img className="sidebar_logo" src={require(theme === "dark" ? '../images/default.png' : '../images/default.png')} alt=""/>*/}

            <div className={(window.location.pathname === "/") ? "sidebar_item sidebar_item_active" : "sidebar_item"} style={{ marginTop: "60px" }} onClick={e => navigate(`/`)}>
                <i className={`material-symbols-outlined ${(window.location.pathname === "/") && "icon-filled icon-color"}`}>chat_bubble</i>&nbsp;&nbsp;&nbsp;Chat
            </div>

            <div className={(window.location.pathname === "/models") ? "sidebar_item sidebar_item_active" : "sidebar_item"} onClick={e => navigate(`/models`)}>
                <i className={`material-symbols-outlined ${(window.location.pathname === "/models") && "icon-filled icon-color"}`}>deployed_code</i>&nbsp;&nbsp;&nbsp;Models
            </div>
        </nav>

        <div className={sidebar ? "sidebar_overlay sidebar_open" : "sidebar_overlay"} onClick={showSidebar}></div>
        </>
  )
}

export default Sidebar;