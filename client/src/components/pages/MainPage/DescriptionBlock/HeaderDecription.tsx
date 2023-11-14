import { Container, Typography } from '@mui/material'

import styles from './description.style.module.scss'

const HeaderDescription = () => {
  return (
    <Container
      component={'section'}
      className={styles.descriptionHeaderContainer}>
      <Typography
        component={'h2'}
        variant='h5'
        className={styles.descriptionHeader}>
        Часто вы попадали в ситуацию, когда все переговорные комнаты заняты
        ровно тогда, когда вам они нужны?
      </Typography>
      <Typography
        component={'p'}
        variant='h6'
        className={styles.decriptionHeaderText}>
        Вы прекрасно могли наблюдать, что средняя загрузка переговорных комнат
        составляет около 45%. И каждый раз, по закону подлости, они заняты
        тогда, когда они нужны.
        <br />
        Наша система бронирования позволяет всегда знать, что в конкретный
        промежуток времени переговорные будут заняты, и больше вы не попадете в
        неловкую ситуацию, в которой ваш клиент ждет окончания митапа или
        собеседования.
      </Typography>
    </Container>
  )
}

export default HeaderDescription
