import * as React from 'react'
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'

import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import styles from './styles.module.scss'
import { changeModal } from '../../../store/reducers/ModalSlice'
import { useAppDispatch } from '../../../hooks/redux'

export default function Register() {
  const dispatch = useAppDispatch()
  const handleRegClose = () =>
    setTimeout(() => dispatch(changeModal({ open: null })), 1000)
  const handleLoginOpen = () => dispatch(changeModal({ open: 'login' }))

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.currentTarget))
    data.isAdminValue = alignment
    if (alignment === 'new') {
      data.isApprovedValue = 'true'
    }
    console.log(data)

    const res = await fetch('http://localhost:3002/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    await res.json()
  }

  const [alignment, setAlignment] = React.useState('exist')

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment)
  }

  return (
    <Box className={styles.modal} sx={{ bgcolor: 'background.paper' }}>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component='h1' variant='h5'>
        Зарегистрироваться
      </Typography>
      <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id='email'
              label='Эл. почта'
              name='email'
              autoComplete='email'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name='password'
              label='Пароль'
              type='password'
              id='password'
              autoComplete='new-password'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name='firstName'
              label='Имя'
              id='firstName'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name='lastName'
              label='Фамилия'
              id='lastName'
            />
          </Grid>
          <Grid item xs={12}>
            <ToggleButtonGroup
              color='primary'
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label='Platform'>
              <ToggleButton value='exist'>работник компании</ToggleButton>
              <ToggleButton value='new'>создатель компании</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name='company'
              label='Наименование компании'
              id='company'
            />
          </Grid>
        </Grid>
        <Button
          type='submit'
          fullWidth
          onClick={handleRegClose}
          variant='contained'
          sx={{ mt: 3, mb: 2 }}>
          Зарегистрироваться
        </Button>
        <Grid container justifyContent='flex-end'>
          <Grid item>
            <Link
              className={styles.link}
              onClick={() => {
                handleLoginOpen()
              }}
              variant='body2'>
              Уже есть аккаунт? Войти
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
