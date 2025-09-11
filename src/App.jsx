import { useState } from 'react'
import {Routes , Route} from 'react-router-dom'
import IndexPage from './pages/indexPage'
import Login from './pages/auth/login'
import SignUp from './pages/auth/signup'
import RequireAuth from './utils/auth/requireAuth'
import ChatServer from './pages/ChatServer'

function App() {
  const [value , setValue] = useState('')
  return (
    <Routes>
      <Route  path='/login' element={<Login></Login>}/>
      <Route  path='/signup' element={<SignUp/>}/>
      <Route element={<RequireAuth></RequireAuth>}>
        <Route path='/' element={<IndexPage></IndexPage>}>
          <Route index element={<ChatServer></ChatServer>}></Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default App
 