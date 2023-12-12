import React from "react";

import '../styles.css';

const Models = ( props ) => {
    
    return (
        <>
        <div className="list_container">
            <div className="page_title_large">Models</div>
        </div>

        <div className="list_container" style={{ marginTop: "10px" }}>

            <div className="list_bubble">
                <div className={`bubble_title`}>TheBloke/Llama-2-13B-Chat-GPTQ</div>
                
                <button type="button" className="checkbox_button" style={{ marginTop: "15px", marginBottom: "0px" }} disabled><i className="material-symbols-outlined inline-icon">check</i> Selected</button>
            </div>            
        </div>
        </>
    );
}

export default Models;