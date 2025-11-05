import { useState } from 'react'
import {Routes , Route} from 'react-router-dom'
import Login from './pages/auth/login'
import SignUp from './pages/auth/signup'
import RequireAuth from './services/auth/requireAuth'
import ChatServer from './pages/ChatServer'
import EmptyChatArea from './components/chat/chat-area/emptyChatArea'
import NewChatArea from './components/chat/chat-area/newChatArea'
import ProfilePage from './pages/ProfilePage'
import ProfilePreview from './components/profilePages/profilePreview/ProfilePreview'
import EditProfile from './components/profilePages/editProfile/EditProfile'
import Security from './components/profilePages/security/SecurityPage'
import ProfilePrivacy from './components/profilePages/profilePrivacy/ProfilePrivacy'
import Appearance from './components/profilePages/appearance/Appearance'
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
          <Route path='/profile' element={<ProfilePage></ProfilePage>} >
            <Route index  element={<ProfilePreview></ProfilePreview>}></Route>
            <Route path='edit' element={<EditProfile></EditProfile>}></Route>
            <Route path='security' element={<Security></Security>}></Route>
            <Route path='privacy' element={<ProfilePrivacy></ProfilePrivacy>}></Route>
            <Route path='appearance' element={<Appearance></Appearance>}> </Route>
          </Route>
      </Route>
    </Routes>
  )
}

export default App
 