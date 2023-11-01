import React from 'react'
import { AppBar, Toolbar, Container } from '@mui/material'

import { ThemeProvider } from '@emotion/react'
import { mainTheme } from '../themes/mainTheme'
import Logo from './Logo'
import NavMenu from './NavMenu'
import AvatarMenu from './Avatar'

function NavBar() {
  return (
    <ThemeProvider theme={mainTheme}>
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
    </ThemeProvider>
  )
}
export default NavBar
