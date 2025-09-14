import { useState } from 'react'
import {Routes , Route} from 'react-router-dom'
import Login from './pages/auth/login'
import SignUp from './pages/auth/signup'
import RequireAuth from './services/auth/requireAuth'
import ChatServer from './pages/ChatServer'
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
            <Route path='chat/:userid' element={<NewChatArea></NewChatArea>}></Route>
          </Route>
      </Route>
    </Routes>
  )
}

export default App
 