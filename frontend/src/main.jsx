import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// renderizar la applicación para detectar problemas que se desarrollen
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)