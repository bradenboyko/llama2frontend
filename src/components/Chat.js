import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { Formik, Form, Field } from 'formik';

import { chatSchema } from "../schemas";
import ChatBubble from "./ChatBubble";
import '../styles.css';

const Chat = ( props ) => {
    const { user, setUser } = props;

    const [allMessages, setAllMessages] = useState([]);
    const messagesEndRef = useRef(null);

    // sorts all messages
    useEffect(() => {
        let myMessages = user?.result?.messages?.map((message) => ({
            id: message._id,
            sender: "me",
            content: message.content,
            date: message.date,
        }));
        
        let botMessages = user?.result?.messages?.map((message) => ({
            id: message._id,
            sender: "bot",
            content: message.response,
            date: message.date,
        }));

        let messages = [...(myMessages || []), ...(botMessages || [])].sort((a, b) => new Date(a.date) - new Date(b.date));
        setAllMessages(messages);
    }, [user]);

    const chatInitialValues = {
        content: "",
    }

    // handles chat
    const handleSubmit = async (values, {resetForm}) => {
        try {
            resetForm();

            // adds user message
            const newMessage = {
                id: Date.now(),
                sender: "me",
                content: values.content,
                date: new Date().toISOString(),
            };
            setAllMessages([...allMessages, newMessage]);

            await new Promise((resolve) => setTimeout(resolve, 1000));

            // adds bot typing message
            const botTyping = {
                id: 'bot-typing',
                sender: "bot",
                content: "...",
                date: new Date().toISOString(),
            };
            setAllMessages(prevMessages => [...prevMessages, botTyping]);

            await new Promise((resolve) => setTimeout(resolve, 2500));
            
            const response = await axios({
                url: `https://api.runpod.ai/v2/ENDPOINT_ID`,
                method: 'POST',
                responseType: 'json',
                data: values,
            });
            // chat success, update the messages array
            console.log(response.data);

            // removes temporary bot message
            setAllMessages(prevMessages => prevMessages.filter(message => message.id !== 'bot-typing'));

            // adds bot message
            const botResponse = {
                id: response.data.messages[response.data.messages.length - 1]._id,
                sender: "bot",
                content: response.data.messages[response.data.messages.length - 1].response,
                date: response.data.messages[response.data.messages.length - 1].date,
            };
            setAllMessages([...allMessages, botResponse]);
        } catch (error) {
            // removes temporary bot message
            setAllMessages(prevMessages => prevMessages.filter(message => message.id !== 'bot-typing'));
            const chatError = {
                id: 'chat-error',
                sender: "bot",
                content: "The endpoint https://api.runpod.ai/v2/ENDPOINT_ID did not return a response.",
                date: new Date().toISOString(),
            };
            setAllMessages(prevMessages => [...prevMessages, chatError]);
        }
    };

    // scrolls to bottom on load
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "auto" });
        }
    }, [allMessages]);
    
    return (
        <>
        <div style={{ overflow: "none" }}>

        <div className="chat_container" style={{ marginTop: "10px" }}>
            
            <div className="messages_container">
                {allMessages?.map((message, index) => (
                    <div key={index}>
                        <ChatBubble messageData={message}/>
                    </div>
                ))}
                <div ref={messagesEndRef}></div>
            </div>

        </div><br/>

        <Formik onSubmit={handleSubmit} initialValues={chatInitialValues} validationSchema={chatSchema}>
            {({ errors, isSubmitting, values, submitCount }) => {

            return (
            <Form className="send_message_bar">
                
                <Field name="content" type="text" className="form_chatbox" placeholder="Send a message"></Field>
                <button type="submit" disabled={isSubmitting} className="send_message_button"><i className="material-symbols-outlined inline-icon">send</i></button><br/>
            
                <div className="subtext" style={{ marginTop: "15px", marginBottom: "10px", fontSize: "12px", textAlign: "center" }}>Selected model: Llama2</div>
            </Form>)}}
        </Formik>
        </div>
        </>
    );
}

export default Chat;