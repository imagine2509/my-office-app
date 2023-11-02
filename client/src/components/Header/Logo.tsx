import { Box } from '@mui/material'
import logo from '../../assets/img/logo.png'

type LogoProps = {
  xs: boolean
}

const Logo = ({ xs }: LogoProps) => {
  return xs ? (
    <>
      <Box
        component='img'
        src={logo}
        alt='Logo'
        sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, height: 65 }}
      />
    </>
  ) : (
    <>
      <Box
        component='img'
        src={logo}
        alt='Logo'
        sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, height: 65 }}
      />
    </>
  )
}

export default Logo
