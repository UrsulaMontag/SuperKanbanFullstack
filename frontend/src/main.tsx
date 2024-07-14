import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {LoaderProvider} from "./contexts/LoaderContext.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <LoaderProvider>
            <App/>
        </LoaderProvider>
    </React.StrictMode>,
)
