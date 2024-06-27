import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '@/assets/css/globals.css'
import axios from 'axios'

axios.defaults.baseURL = "http://localhost:3002/api/gestionAdquisicion";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
