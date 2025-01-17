import { useEffect } from "react";

const WebSocketExample = () => {
    const websocketUrl = "wss://localhost:7248/api/notification/connect"; // Update this to match your backend WebSocket URL

    useEffect(() => {
        let websocket;

        try {
            websocket = new WebSocket(websocketUrl);

            websocket.onopen = () => {
                console.log("WebSocket connection opened");
            };

            websocket.onmessage = (event) => {
                console.log("WebSocket message received:", event.data);
            };

            websocket.onclose = (event) => {
                console.log("WebSocket connection closed:", event);
            };

            websocket.onerror = (error) => {
                console.error("WebSocket error:", error);
            };
        } catch (error) {
            console.error("WebSocket initialization error:", error);
        }

        return () => {
            if (websocket) {
                websocket.close();
            }
        };
    }, []); // Empty dependency array ensures this runs only once

    return (
        <div>
            <h1>WebSocket Notification Example</h1>
        </div>
    );
};

export default WebSocketExample;
