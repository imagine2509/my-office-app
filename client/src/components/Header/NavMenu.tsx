import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from '@mui/material'
import {
  Menu as MenuIcon,
  LockOutlined as LockOutlinedIcon,
} from '@mui/icons-material'
import { useState } from 'react'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'

type MenuProps = {
  burger: boolean
}

const pages = ['Войти', 'Зарегистрироваться']

const NavMenu = ({ burger }: MenuProps) => {
  const [loginOpen, setLoginOpen] = useState(false)
  const [regOpen, setRegOpen] = useState(false)

  const handleLoginOpen = () => setLoginOpen(true)
  const handleLoginClose = () => setLoginOpen(false)

  const handleRegOpen = () => setRegOpen(true)
  const handleRegClose = () => setRegOpen(false)

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const res = await fetch('http://localhost:3002/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const userData = res.json()
    console.log(userData)
  }

  return burger ? (
    <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
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
        {pages.map((page) => (
          <MenuItem key={page} onClick={handleCloseNavMenu}>
            <Typography textAlign='center'>{page}</Typography>
          </MenuItem>
        ))}
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
