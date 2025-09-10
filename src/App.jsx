import { useState } from 'react'
import {Routes , Route} from 'react-router-dom'
import IndexPage from './pages/indexPage'
import Login from './pages/auth/login'
import SignUp from './pages/auth/signup'

function App() {
  const [value , setValue] = useState('')
  return (
    <Routes>
      <Route  path='/login' element={<Login></Login>}/>
      <Route  path='/signup' element={<SignUp/>}/>
      <Route path='/' element={<IndexPage></IndexPage>}>
      </Route>
    </Routes>
  )
}

export default App
 