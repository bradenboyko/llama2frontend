import React from "react";

import '../styles.css';

const ChatBubble = (props) => {
    const { messageData } = props;

    return (
        <>
        <div className="individual_message_container" style={{ justifyContent: (messageData?.sender === "assistant" || messageData?.sender === "system") ? "left" : "" }}>

            <div className={`individual_message_bubble ${messageData?.sender === "user" && "message_sender"}`}>
                {messageData?.content}
            </div>
        </div>
        </>
    );
}

export default ChatBubble;