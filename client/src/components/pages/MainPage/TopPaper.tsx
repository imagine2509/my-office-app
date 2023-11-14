import { Box, Grid, Paper, Typography } from '@mui/material'

import styles from './main.styles.module.scss'

const TopPaper = () => {
  const props = {
    header: 'Система бронирования рабочих мест',
    description: `Быстро и эффективно бронируй места для переговоров, собеседований,
		презентаций, совещаний и перекусов`,
    image: '/paper.jpg',
    imageText: 'Фон',
  }
  return (
    <Paper className={styles.mainPaper}>
      {
        <img
          style={{ display: 'none' }}
          src={props.image}
          alt={props.imageText}
        />
      }
      <Box className={styles.paperBox} />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}>
            <Typography
              component='h1'
              variant='h3'
              color='inherit'
              gutterBottom>
              {props.header}
            </Typography>
          </Box>
        </Grid>
        <Typography
          variant='h5'
          color='inherit'
          paragraph
          className={styles.paperText}>
          {props.description}
        </Typography>
      </Grid>
    </Paper>
  )
}

export default TopPaper
