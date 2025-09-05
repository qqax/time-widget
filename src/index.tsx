import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/main.scss";

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error("Root container not found. Make sure there is a div with id='root' in your HTML.");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);