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

export default function Login() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.currentTarget)) // TODO: fetch to server
    const res = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const userData = await res.json()
    console.log(userData)
  }

  return (
    <Box className={styles.modal} sx={{ bgcolor: 'background.paper' }}>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component='h2' variant='h5'>
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
            <Link href='/signup' variant='body2'>
              {'Не зарегистрированы? Создать аккаунт'}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
