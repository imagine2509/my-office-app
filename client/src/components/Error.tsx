import { Container, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

type ErrorProps = {
  errorText: string
}

const ErrorComponent = (props: ErrorProps) => {
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate('/')
    }, 10000)
  }, [])

  return (
    <Container>
      <Typography component={'h2'} variant='h2'>
        Упс! Ошибка!
      </Typography>
      <Typography component={'p'} variant='h3'>
        {props.errorText}
      </Typography>
      <Typography component={'p'} variant='h3'>
        Вы будете переадресованы на главную страницу через 10 секунд
      </Typography>
    </Container>
  )
}

export default ErrorComponent
