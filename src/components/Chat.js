import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { Formik, Form, Field } from 'formik';

import { chatSchema } from "../schemas";
import ChatBubble from "./ChatBubble";
import '../styles.css';

const Chat = ( props ) => {

    const [allMessages, setAllMessages] = useState([]);
    const messagesEndRef = useRef(null);

    // load messages from localStorage on initial render
    useEffect(() => {
        const savedMessages = localStorage.getItem('chatMessages');
        if (savedMessages) {
            setAllMessages(JSON.parse(savedMessages));
        }
    }, []);

    // save messages to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('chatMessages', JSON.stringify(allMessages));
    }, [allMessages]);

    // clears chat history
    const clearHistory = () => {
        setAllMessages([]);
        localStorage.removeItem('chatMessages');
    };

    const chatInitialValues = {
        content: "",
    }

    // handles chat submit
    const handleSubmit = async (values, {resetForm}) => {
        try {
            if (values.content === "" || values.content === " ") return;
            resetForm();

            // adds user's message
            const newMessage = {
                sender: "user",
                content: values.content,
                date: new Date().toISOString(),
            };
            setAllMessages([...allMessages, newMessage]);

            // create chat history string
            const chatHistoryString = allMessages.map(message => 
                `${message.sender.toUpperCase()}: ${message.content}`
            ).join('\n');

            // modify the request data
            const requestData = {
                content: values.content,
                chatHistory: chatHistoryString
            };

            await new Promise((resolve) => setTimeout(resolve, 500));

            // adds bot typing message
            const botTyping = {
                sender: "system",
                content: "...",
                date: new Date().toISOString(),
            };
            setAllMessages(prevMessages => [...prevMessages, botTyping]);

            // sends request to backend
            const response = await axios({
                url: `${process.env.REACT_APP_BACKEND_URL}/routes/llama`,
                method: 'POST',
                responseType: 'json',
                data: requestData,
            });
            // send success, removes temporary bot message
            setAllMessages(prevMessages => prevMessages.filter(message => message.sender !== 'system'));

            // adds bot message
            const botResponse = {
                sender: "assistant",
                content: response.data.output,
                date: new Date().toISOString(),
            };
            setAllMessages(prevMessages => [...prevMessages, botResponse]);

        } catch (error) {
            console.log(error);
            
            // removes temporary bot message
            setAllMessages(prevMessages => prevMessages.filter(message => message.sender !== 'system'));
            const chatError = {
                sender: "system",
                content: "The endpoint https://api.runpod.ai/v2/d8w57gwvmcpckk did not return a response. Runpod is waiting for GPUs to become available. Try again in an hour!",
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
                
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className="subtext" style={{ marginTop: "15px", marginBottom: "10px", fontSize: "12px", textAlign: "center", marginRight: "4px" }}>Model: TheBloke/Llama-2-13B-Chat-GPTQ •</div>
                    <span className="subtext_button" onClick={clearHistory}>Clear history</span>
                </div>
            </Form>)}}
        </Formik>
        </div>
        </>
    );
}

export default Chat;