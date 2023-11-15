/* eslint-disable no-empty-pattern */
import {
  Badge,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Tooltip,
  Typography,
} from '@mui/material'
import DuoIcon from '@mui/icons-material/Duo'
import VideocamOffIcon from '@mui/icons-material/VideocamOff'
import styles from './RoomCard.styles.module.scss'
import { roomAPI } from '../../../../hooks/roomService'
import { useNavigate } from 'react-router-dom'

interface Props {
  officeId: number
  name: string
  amount: number
  video: boolean
  description: string
  photo: string
  id: number
}

function RoomCard(props: Props) {
  const navigate = useNavigate()

  const allRooms = roomAPI.useGetAllRoomsQuery(null)

  const { photo, name, description, video, id, amount } = props

  const [changeRoom, {}] = roomAPI.useChangeRoomMutation()
  const handleChangeRoom = async () => {
    const description = prompt() || ''
    await changeRoom({ ...props, description })
    allRooms.refetch()
  }
  const [deleteRoom, {}] = roomAPI.useDeleteRoomMutation()
  const handleDeleteRoom = async (id: number) => {
    await deleteRoom(id)
    allRooms.refetch()
  }

  return (
    <Grid item key={name}>
      <Card className={styles.roomCard}>
        <CardMedia
          component='img'
          height='140'
          image={photo}
          alt={description}
        />
        <CardContent>
          <Badge
            badgeContent={amount}
            color='primary'
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
            <Typography variant='h5' className={styles.name}>
              {name}
            </Typography>
          </Badge>
          <Typography
            variant='body2'
            color='text.secondary'
            className={styles.description}>
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Grid
            container
            direction='row'
            justifyContent='space-between'
            alignItems='center'>
            {video ? (
              <Tooltip title='Видеосвязь есть' placement='top-end'>
                <DuoIcon />
              </Tooltip>
            ) : (
              <Tooltip title='Видеосвязи нет' placement='top-end'>
                <VideocamOffIcon />
              </Tooltip>
            )}
            <Button size='small' onClick={() => navigate(`/rooms/${id}`)}>
              Подробнее
            </Button>
            <Button size='small' onClick={() => handleChangeRoom()}>
              Изменить
            </Button>
            <Button size='small' onClick={() => handleDeleteRoom(id)}>
              Удалить
            </Button>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default RoomCard
