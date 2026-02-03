//element react
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

//router from app
import App from './App.jsx'

// ⬇️ bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
