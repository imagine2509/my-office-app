import { Button, Container, Typography } from '@mui/material'

const ActivateWindow = () => {
  const activation = async () => {
    const data = window.location.href
    const res = data.replace('5173', '3002')
    console.log(data)

    const resData = await fetch(`${res}`)
    console.log(resData)
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
