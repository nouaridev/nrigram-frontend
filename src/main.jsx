import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import AuthProvider from './contexts/athContext.jsx'
import LoadingProvider from './contexts/loaderContext.jsx'
import SocketProvider from './contexts/socketIo.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <SocketProvider >
    <LoadingProvider>
      <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
      </AuthProvider>
    </LoadingProvider>
   </SocketProvider>
  </StrictMode>
)
