import { Container, Typography } from '@mui/material'

const ErrorComponent = (errorText: string) => {
  return (
    <Container>
      <Typography component={'h2'} variant='h2'>
        Упс! Ошибка!
      </Typography>
      <Typography component={'p'} variant='h3'>
        {errorText}
      </Typography>
    </Container>
  )
}

export default ErrorComponent
