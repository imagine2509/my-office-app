import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Grid } from '@mui/material'

import styles from './calendar.styles.module.scss'
import CalendarComponent from './Calendar'
import TimePickers from './TimePicker'

function CalendarPage() {
  return (
    <Grid container className={styles.calendarPageContainer}>
      <Grid item>
        <CalendarComponent />
      </Grid>
      <Grid item>
        <TimePickers />
      </Grid>
    </Grid>
  )
}

export default CalendarPage
