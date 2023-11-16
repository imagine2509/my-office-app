import { Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './components/Header/NavBar'
import ProfileContainer from './components/pages/Account/Container/ProfileContainer'
import Main from './components/pages/MainPage/Main'
import MainContent from './components/pages/RoomsPage/MainContent'
import ActivateWindow from './components/pages/Register/ActivateWindow'
import AdminPage from './components/pages/Admin/AdminPage'
import CalendarPage from './components/pages/RoomsPage/RoomCard/Calendar/CalendarPage'

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Main />}></Route>
        <Route path='/profile' element={<ProfileContainer />}></Route>
        <Route path='/rooms' element={<MainContent />} />
        <Route path='/rooms/:id' element={<CalendarPage />} />
        <Route
          path='api/user/activate/:link'
          element={<ActivateWindow />}></Route>
        <Route path='/admin' element={<AdminPage />}></Route>
      </Routes>
    </>
  )
}

export default App
