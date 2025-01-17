import React, { createContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
    useEffect(() => {
        const websocket = new WebSocket("wss://localhost:7248/api/notification/connect");

        websocket.onmessage = (event) => {
            console.log("Raw WebSocket message:", event.data);

            try {
                const data = JSON.parse(event.data);
                toast(data.message); // Display toast with the parsed message
            } catch (error) {
                console.error("Failed to parse WebSocket message as JSON:", error);
                toast(event.data); // Display toast with the raw message
            }
        };

        return () => {
            websocket.close();
        };
    }, []);

    return (
        <WebSocketContext.Provider value={{}}>
            {children}
            <ToastContainer position="top-right" autoClose={5000} />
        </WebSocketContext.Provider>
    );
};
