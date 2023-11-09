import * as React from 'react'
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
} from '@mui/material'
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material'
import styles from './styles.module.scss'
import { useAppDispatch } from '../../../hooks/redux'
import { closeModal, openModal } from '../../../store/reducers/ModalSlice'
import { setUser } from '../../../store/reducers/UserSlice'

export default function Login() {
  const dispatch = useAppDispatch()

  const handleLoginClose = () =>
    setTimeout(() => dispatch(closeModal('login'), 1000))
  const handleRegOpen = () => dispatch(openModal('reg'))

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.currentTarget))

    try {
      const res = await fetch('http://localhost:3002/api/user/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      const userData = await res.json()
      console.log(userData)
      localStorage.setItem('id', `${userData.id}`)
      localStorage.setItem('refreshToken', `${userData.refreshToken}`)
      localStorage.setItem('accessToken', `${userData.accessToken}`)
      localStorage.setItem('firstName', `${userData.firstName}`)
      localStorage.setItem('lastName', `${userData.lastName}`)
      localStorage.setItem('email', `${userData.email}`)
      localStorage.setItem('officeId', `${userData.officeId}`)
      localStorage.setItem('companyId', `${userData.companyId}`)
      localStorage.setItem('isAdmin', `${userData.isAdmin}`)
      dispatch(setUser(userData))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Box className={styles.modal} sx={{ bgcolor: 'background.paper' }}>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component='h1' variant='h5'>
        Войти
      </Typography>
      <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin='normal'
          required
          fullWidth
          id='email'
          label='Email Address'
          name='email'
          autoComplete='email'
          autoFocus
        />
        <TextField
          margin='normal'
          required
          fullWidth
          name='password'
          label='Password'
          type='password'
          id='password'
          autoComplete='current-password'
        />
        <Button
          type='submit'
          fullWidth
          onClick={handleLoginClose}
          variant='contained'
          sx={{ mt: 3, mb: 2 }}>
          Войти
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href='#' variant='body2'>
              Забыли пароль?
            </Link>
          </Grid>
          <Grid item>
            <Link
              className={styles.link}
              onClick={() => {
                handleLoginClose()
                handleRegOpen()
              }}
              variant='body2'>
              {'Не зарегистрированы? Создать аккаунт'}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
