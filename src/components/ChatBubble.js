import React from "react";

import '../styles.css';

const ChatBubble = (props) => {
    const { messageData } = props;

    return (
        <>
        <div className="individual_message_container" style={{ justifyContent: messageData?.sender === "bot" ? "left" : "" }}>

            <div className={`individual_message_bubble ${messageData?.sender === "me" && "message_sender"}`}>
                {messageData?.content}
            </div>
        </div>
        </>
    );
}

export default ChatBubble;