import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { StyledEngineProvider, ThemeProvider } from '@mui/material'
import { mainTheme } from './components/themes/mainTheme.ts'
import store from './store/store.ts'
import { CookiesProvider } from 'react-cookie'
import CheckUser from './components/pages/MainPage/CheckToken.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <CookiesProvider>
    <Provider store={store}>
      <ThemeProvider theme={mainTheme}>
        <StyledEngineProvider injectFirst>
          <BrowserRouter>
            <CheckUser />
            <App />
          </BrowserRouter>
        </StyledEngineProvider>
      </ThemeProvider>
    </Provider>
  </CookiesProvider>
)
