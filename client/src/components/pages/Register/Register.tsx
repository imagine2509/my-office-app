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

import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import styles from './styles.module.scss'

export default function Register() {
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.currentTarget))
    const res = await fetch('http://localhost:3000/api/register', {
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
    <Box className={styles.modal}>
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
              label='Email Address'
              name='email'
              autoComplete='email'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='new-password'
            />
          </Grid>
        </Grid>
        <Button
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}>
          Зарегистрироваться
        </Button>
        <Grid container justifyContent='flex-end'>
          <Grid item>
            <Link href='/signin' variant='body2'>
              Уже есть аккаунт? Войти
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
