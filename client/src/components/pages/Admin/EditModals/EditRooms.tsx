/* eslint-disable no-empty-pattern */
import { Box, TextField, Button, Switch, FormControlLabel, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material'
import { useAppDispatch } from '../../../../hooks/redux'
import { changeModal } from '../../../../store/reducers/ModalSlice'
import { room, roomAPI } from '../../../../hooks/roomService'
import styles from '../admin.style.module.scss'
import React from 'react'
import { officeAPI , office} from '../../../../hooks/officeService'


type officeOnlyIdAndName = {
  id: number,
  name: string ,
}

const EditRoom = ({ id, amount, video, description , photo , officeId , name }:room) => {
  const [roomName, setRoomName] = React.useState(name)
  const [roomAmount, setRoomAmount] = React.useState(amount)
  const [roomVideo, setRoomVideo] = React.useState(video)
  const [roomDescription, setRoomDescription] = React.useState(description)
  const [roomPhoto, setRoomPhoto] = React.useState(photo)
  const [roomOfficeId, setRoomOfficeId] = React.useState(officeId)

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoomVideo(event.target.checked);
  };

  const handleRoomOfficechange = (event: SelectChangeEvent<number>) => {
    setRoomOfficeId(Number(event.target.value));
  };

  const allRooms = roomAPI.useGetAllRoomsQuery(null)
  const allOffices = officeAPI.useGetAllOfficesQuery(null)
  const currentOffices = allOffices.data?.reduce((acc:officeOnlyIdAndName[], office:office) => {
    acc.push({id:office.id , name:office.name});
    return acc;
  }, [])
  
  const [changeRoom,{}] = roomAPI.useChangeRoomMutation()
  
  const dispatch = useAppDispatch()

  const handleEditRoomClose = () =>
    setTimeout(() => dispatch(changeModal({ open: null })), 1000)
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()
    await changeRoom({
      id:id,
      amount:roomAmount,
      video:roomVideo,
      description:roomDescription,
      photo:roomPhoto,
      officeId:roomOfficeId,
      name:roomName,
    } as room)
    allRooms.refetch()
    handleEditRoomClose()
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
        id={`${id}`}
        label='Название'
        value={roomName}
        name={name}
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
        name={description}
        label='Описание'
        id={description}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setRoomDescription(event.target.value)
        }}
      />
      <TextField
        margin='normal'
        required
        fullWidth
        value={roomPhoto}
        name={photo}
        label='Ссылка на фото'
        id={photo}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setRoomPhoto(event.target.value)
        }}
      />
      <FormControlLabel control={
      <Switch
      checked={roomVideo}
      onChange={handleVideoChange}
      inputProps={{ 'aria-label': 'controlled' }}
      />
      } label="Видеосвязь" />
      <TextField
      type='number'
      margin='normal'
      required
      fullWidth
      value={roomAmount}
      name={photo}
      label='Вместительность:'
      id={photo}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        setRoomAmount(Number(event.target.value))
      }}
      />
<InputLabel id="officeLabel">В каком офисе находится</InputLabel>
<Select
    labelId="officeLabel"
    id="officeSelect"
    value={roomOfficeId}
    label="Офис"
    onChange={handleRoomOfficechange}
    >
    {
      currentOffices?.map(
        (office) =>
          <MenuItem value={office.id}>{office.name}</MenuItem>
      )
    }
  </Select>
      <Button
        type='submit'
        fullWidth
        onClick={handleEditRoomClose}
        variant='contained'
        sx={{ mt: 3, mb: 2 }}>
        Сохранить
      </Button>
    </Box>
  )
}

export default EditRoom
