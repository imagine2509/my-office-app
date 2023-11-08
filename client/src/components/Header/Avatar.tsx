import {
  Box,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Avatar,
} from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AvatarMenu = () => {
  const settings = [
    { name: 'Профиль', link: '/profile' },
    { name: 'Выйти', link: '/' },
  ]

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const navigate = useNavigate()

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleTabClick = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    newValue: string
  ) => {
    event.preventDefault()
    navigate(newValue)
  }

  const handleLogout = async () => {
    await fetch('http://localhost:3002/api/user/logout', {
      method: 'POST',
    })
  }

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title='Open settings'>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id='menu-appbar'
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}>
        {settings.map((setting) => (
          <MenuItem key={setting.link} onClick={handleCloseUserMenu}>
            <Typography
              onClick={(event) => {
                event.currentTarget.textContent === 'Выйти'
                  ? handleLogout
                  : handleTabClick(event, `${setting.link}`)
              }}
              textAlign='center'>
              {setting.name}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

export default AvatarMenu
