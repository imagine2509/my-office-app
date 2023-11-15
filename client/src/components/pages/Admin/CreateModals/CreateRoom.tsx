/* eslint-disable no-empty-pattern */
import { Box, TextField, Button, Switch, FormControlLabel } from '@mui/material'
import { useAppDispatch } from '../../../../hooks/redux'
import { changeModal } from '../../../../store/reducers/ModalSlice'
import { room, roomAPI } from '../../../../hooks/roomService'
import styles from '../admin.style.module.scss'
import React from 'react'

type CreateRoomProps = Pick<room, 'officeId'>

const CreateRoom = ({ officeId }: CreateRoomProps) => {
  const [roomName, setRoomName] = React.useState('')
  const [roomAmount, setRoomAmount] = React.useState(0)
  const [roomVideo, setRoomVideo] = React.useState(false)
  const [roomDescription, setRoomDescription] = React.useState('')
  const [roomPhoto, setRoomPhoto] = React.useState('')

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoomVideo(event.target.checked)
  }

  const allRooms = roomAPI.useGetAllRoomsQuery(null)

  const [addRoom, {}] = roomAPI.useAddRoomMutation()

  const dispatch = useAppDispatch()

  const handleClose = () =>
    setTimeout(() => dispatch(changeModal({ open: null })), 1000)

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()
    await addRoom({
      amount: roomAmount,
      video: roomVideo,
      description: roomDescription,
      photo: roomPhoto,
      officeId: officeId,
      name: roomName,
    } as room)
    allRooms.refetch()
    handleClose()
  }

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      noValidate
      className={styles.modal}
      sx={{ mt: 1, bgcolor: 'background.paper' }}>
      <TextField
        margin='normal'
        required
        fullWidth
        label='Название'
        value={roomName}
        name={roomName}
        autoFocus
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setRoomName(event.target.value)
        }}
      />
      <TextField
        margin='normal'
        required
        fullWidth
        value={roomDescription}
        name={roomDescription}
        label='Описание'
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setRoomDescription(event.target.value)
        }}
      />
      <TextField
        margin='normal'
        required
        fullWidth
        value={roomPhoto}
        name={roomPhoto}
        label='Ссылка на фото'
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setRoomPhoto(event.target.value)
        }}
      />
      <FormControlLabel
        control={
          <Switch
            checked={roomVideo}
            onChange={handleVideoChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        }
        label='Видеосвязь'
      />
      <TextField
        type='number'
        margin='normal'
        required
        fullWidth
        value={roomAmount}
        label='Вместительность:'
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setRoomAmount(Number(event.target.value))
        }}
      />
      <Button
        type='submit'
        fullWidth
        onClick={handleClose}
        variant='contained'
        sx={{ mt: 3, mb: 2 }}>
        Сохранить
      </Button>
    </Box>
  )
}

export default CreateRoom
