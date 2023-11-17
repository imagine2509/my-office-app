/* eslint-disable no-empty-pattern */
import {
  Badge,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Modal,
  Tooltip,
  Typography,
} from '@mui/material'
import DuoIcon from '@mui/icons-material/Duo'
import VideocamOffIcon from '@mui/icons-material/VideocamOff'
import EditRoom from '../EditModals/EditRooms'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import { changeModal } from '../../../../store/reducers/ModalSlice'
import { room, roomAPI } from '../../../../hooks/roomService'

import styles from './RoomCard.styles.module.scss'

function RoomCard(props: room) {
  const allRooms = roomAPI.useGetAllRoomsQuery(null)
  const [deleteRoom, {}] = roomAPI.useDeleteRoomMutation()
  const { id, amount, video, description, photo, officeId, name } = props
  const dispatch = useAppDispatch()
  const roomEditOpen = useAppSelector(
    (state) => state.modals.open === 'editRoom' && state.modals.id === id
  )

  const handleDeleteRoom = async (id: number) => {
    await deleteRoom(id)
    allRooms.refetch()
  }

  const handleRoomEditClose = () => {
    const action = changeModal({ open: null })
    dispatch(action)
  }

  const handleRoomEditOpen = (id: number) => {
    const action = changeModal({ open: 'editRoom', id })
    dispatch(action)
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
          </Grid>
        </CardActions>
      </Card>
      <Box className={styles.controlButtons}>
        <Button
          type='button'
          variant='outlined'
          onClick={() => handleRoomEditOpen(id)}
          key={`editRoom${id}`}
          className={styles.editButton}>
          Редактировать
        </Button>
        <Button
          type='button'
          variant='outlined'
          onClick={() => handleDeleteRoom(id)}
          key={`deleteRoom${id}`}
          className={styles.deleteButton}>
          Удалить
        </Button>
        <Modal
          key={id}
          open={roomEditOpen}
          onClose={() => handleRoomEditClose()}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'>
          <EditRoom
            id={id}
            amount={amount}
            video={video}
            description={description}
            photo={photo}
            officeId={officeId}
            name={name}
          />
        </Modal>
      </Box>
    </Grid>
  )
}

export default RoomCard
