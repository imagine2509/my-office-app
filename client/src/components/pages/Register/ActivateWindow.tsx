import { Button, Container, Typography } from '@mui/material'

const ActivateWindow = () => {
  const activation = async () => {
    const data = window.location.href
    const res = await fetch('http://localhost:5173/api/user/activate/:link', {
      method: 'GET',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: data,
    })
    return res.status
  }
  return (
    <>
      <Container>
        <Typography>Нажми на кнопку, чтобы активировать аккаунт</Typography>
        <Button type='button' onClick={() => activation()}>
          Нажми сюда
        </Button>
      </Container>
    </>
  )
}

export default ActivateWindow
