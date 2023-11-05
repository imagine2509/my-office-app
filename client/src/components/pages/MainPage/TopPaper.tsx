import { Box, Grid, Paper, Typography } from '@mui/material'

import styles from './main.styles.module.scss'

const TopPaper = () => {
  return (
    <Paper className={styles.mainPaper} square={false}>
      <Grid container className={styles.paperContainer}>
        <Grid item md={12}>
          <Box className={styles.paperBoxHeader}>
            <Typography component='h2' variant='h4' gutterBottom>
              Система бронирования рабочих мест
            </Typography>
          </Box>
        </Grid>
        <Grid item md={8}>
          <Box className={styles.paperBoxBody}>
            <Typography component='p' variant='h6' gutterBottom>
              Быстро и эффективно бронируй места для переговоров, собеседований,
              презентаций, совещаний и перекусов.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default TopPaper
