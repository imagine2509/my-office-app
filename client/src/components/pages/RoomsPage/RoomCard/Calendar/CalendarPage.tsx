import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Grid } from '@mui/material'

import styles from './calendar.styles.module.scss'
import CalendarComponent from './Calendar'
import TimePickers from './TimePicker'
import { LocalizationProvider, ruRU } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import BookingsTable from './BookingsTable'

function CalendarPage() {
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      localeText={
        ruRU.components.MuiLocalizationProvider.defaultProps.localeText
      }>
      <Grid container className={styles.calendarPageContainer}>
        <Grid item>
          <CalendarComponent />
        </Grid>
        <Grid item>
          <TimePickers />
        </Grid>
        <Grid item>
          <BookingsTable />
        </Grid>
      </Grid>
    </LocalizationProvider>
  )
}

export default CalendarPage
