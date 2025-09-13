import { useState } from 'react'
import {Routes , Route} from 'react-router-dom'
import Login from './pages/auth/login'
import SignUp from './pages/auth/signup'
import RequireAuth from './utils/auth/requireAuth'
import ChatServer from './pages/ChatServer'
import ChatArea from './components/chat/chat-area/chatArea';
import EmptyChatArea from './components/chat/chat-area/emptyChatArea'
import NewChatArea from './components/chat/chat-area/newChatArea'
function App() {
  return (
    <Routes>
      <Route  path='/login' element={<Login></Login>}/>
      <Route  path='/signup' element={<SignUp/>}/>
      <Route element={<RequireAuth></RequireAuth>}>
        <Route path='/' element={<ChatServer></ChatServer>}>
            <Route index element={<EmptyChatArea></EmptyChatArea>}></Route>
            <Route path='chat/:id' element={<ChatArea></ChatArea>}></Route>
            <Route path='searchchat/:userid' element={<NewChatArea></NewChatArea>}></Route>
          </Route>
      </Route>
    </Routes>
  )
}

export default App
 