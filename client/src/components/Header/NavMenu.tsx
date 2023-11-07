import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Typography,
} from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material'
import { useState } from 'react'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import { useNavigate } from 'react-router-dom'
import { openModal, closeModal } from '../../store/reducers/ModalSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'

type MenuProps = {
  burger: boolean
}

const NavMenu = ({ burger }: MenuProps) => {
  const dispatch = useAppDispatch()
  const loginOpen = useAppSelector((state) => state.modals.login)
  const regOpen = useAppSelector((state) => state.modals.reg)
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)

  const navigate = useNavigate()

  const handleLoginOpen = () => dispatch(openModal('login'))
  const handleLoginClose = () => dispatch(closeModal('login'))

  const handleRegOpen = () => dispatch(openModal('reg'))
  const handleRegClose = () => dispatch(closeModal('reg'))
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleTabClick = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    newValue: string
  ) => {
    event.preventDefault()
    navigate(newValue)
  }

  return burger ? (
    <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
      <Modal
        open={loginOpen}
        onClose={handleLoginClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Login />
      </Modal>

      <Modal
        open={regOpen}
        onClose={handleRegClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Register />
      </Modal>
      <IconButton
        size='large'
        aria-label='account of current user'
        aria-controls='menu-appbar'
        aria-haspopup='true'
        onClick={handleOpenNavMenu}
        color='inherit'>
        <MenuIcon />
      </IconButton>

      <Menu
        id='menu-appbar'
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
          display: { xs: 'block', md: 'none' },
        }}>
        <MenuItem onClick={handleCloseNavMenu}>
          <Typography
            onClick={(event) => handleTabClick(event, '/rooms')}
            textAlign='center'>
            Переговорки
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleCloseNavMenu}>
          <Typography onClick={handleLoginOpen} textAlign='center'>
            Войти
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleCloseNavMenu}>
          <Typography onClick={handleRegOpen} textAlign='center'>
            Зарегистрироваться
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  ) : (
    <Box
      sx={{
        flexGrow: 1,
        display: { xs: 'none', md: 'flex' },
        justifyContent: 'end',
        mr: 2,
      }}>
      <Button
        onClick={(event) => handleTabClick(event, '/rooms')}
        sx={{ my: 2, color: 'white', display: 'block' }}>
        Переговорки
      </Button>
      <Button
        onClick={handleLoginOpen}
        sx={{ my: 2, color: 'white', display: 'block' }}>
        Войти
      </Button>
      <Modal
        open={loginOpen}
        onClose={handleLoginClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Login />
      </Modal>
      <Button
        onClick={handleRegOpen}
        sx={{ my: 2, color: 'white', display: 'block' }}>
        Регистрация
      </Button>
      <Modal
        open={regOpen}
        onClose={handleRegClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Register />
      </Modal>
    </Box>
  )
}

export default NavMenu
