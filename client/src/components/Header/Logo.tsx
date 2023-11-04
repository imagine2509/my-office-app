import { Box } from '@mui/material'
import logo from '../../assets/img/logo.png'
import { useNavigate } from 'react-router-dom'

type LogoProps = {
  xs: boolean
}

const Logo = ({ xs }: LogoProps) => {
  const navigate = useNavigate()

  return xs ? (
    <>
      <Box
        onClick={() => navigate('/')}
        component='img'
        src={logo}
        alt='Logo'
        sx={{
          display: { xs: 'none', md: 'flex' },
          mr: 1,
          height: 65,
          cursor: 'pointer',
        }}
      />
    </>
  ) : (
    <>
      <Box
        onClick={() => navigate('/')}
        component='img'
        src={logo}
        alt='Logo'
        sx={{
          display: { xs: 'flex', md: 'none' },
          mr: 1,
          height: 65,
          cursor: 'pointer',
        }}
      />
    </>
  )
}

export default Logo
