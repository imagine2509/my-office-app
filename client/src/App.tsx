import { Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './components/Header/NavBar'
import ProfileContainer from './components/pages/Account/Container/ProfileContainer'
import Main from './components/pages/MainPage/Main'
import MainContent from './components/pages/RoomsPage/MainContent'
import ActivateWindow from './components/pages/Register/ActivateWindow'

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Main />}></Route>
        <Route path='/profile' element={<ProfileContainer />}></Route>
        <Route path='/rooms' element={<MainContent />}></Route>
        <Route
          path='api/user/activate/:link'
          element={<ActivateWindow />}></Route>
      </Routes>
    </>
  )
}

export default App
