import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import AuthProvider from './contexts/athContext.jsx'
import LoadingProvider from './contexts/loaderContext.jsx'
import SocketProvider from './contexts/socketIo.jsx'
import ConversationProvider from './contexts/conversationContext.jsx'
import ProfileProvider from './contexts/profileContext.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <ConversationProvider>
      <SocketProvider >
      <LoadingProvider>
              <BrowserRouter>
              <ProfileProvider>
                <App />
              </ProfileProvider>
              </BrowserRouter>
      </LoadingProvider>
      </SocketProvider>
    </ConversationProvider>
</AuthProvider>
)
