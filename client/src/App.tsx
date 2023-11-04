import { Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './components/Header/NavBar'
import ProfileContainer from './components/pages/Account/Container/ProfileContainer'
import Register from './components/pages/Register/Register'
import Login from './components/pages/Login/Login'

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/'></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/profile' element={<ProfileContainer />}></Route>
      </Routes>
    </>
  )
}

export default App
