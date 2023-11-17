import { AppBar, Toolbar, Container } from '@mui/material'

import Logo from './Logo'
import NavMenu from './NavMenu'
import AvatarMenu from './Avatar'

function NavBar() {
  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar
          disableGutters
          sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <NavMenu burger={true} />
          <Logo xs={true} />

          <NavMenu burger={false} />
          <Logo xs={false} />

          <AvatarMenu />
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default NavBar
