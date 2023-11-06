import { Button, Card, CardActions, CardContent, CardMedia, Grid, Tooltip, Typography } from '@mui/material'
import DuoIcon from '@mui/icons-material/Duo';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import React from 'react'
import styles from './RoomCard.styles.module.scss'

interface Props {
    officeId:number , name: string, amount: number, video: boolean, description: string, photo: string
}

function RoomCard(props: Props) {
    const {photo, name, description, video, } = props

return (
<Grid item key={name}>
  <Card className={styles.roomCard}>
    <CardMedia component="img" height="140" image={photo} alt={description}/>
    <CardContent>
      <Typography variant="h5">{name}</Typography>
      <Typography variant="body2" color='text.secondary'>{description}</Typography>
    </CardContent>
    <CardActions>
      <Grid container direction="row" justifyContent="space-between" alignItems="center">
        { video ? (
          <Tooltip title="Видеосвязь есть" placement="top-end"><DuoIcon/></Tooltip>
        ):(
          <Tooltip title="Видеосвязи нет" placement="top-end"><VideocamOffIcon/></Tooltip>
        )}
        <Button size='small'>Подробнее</Button>
      </Grid>
    </CardActions>
  </Card>
</Grid>

)
}

export default RoomCard
