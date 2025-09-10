import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import AuthProvider from './contexts/athContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
         <BrowserRouter>
          <App />
        </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
