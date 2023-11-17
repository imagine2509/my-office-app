import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
import { useEffect, useState } from 'react'

import styles from '../profile.module.scss'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import { changeModal } from '../../../../store/reducers/ModalSlice'
import { office } from '../../../../hooks/officeService'
import React from 'react'
import { user ,userAPI } from '../../../../hooks/userService'
import { editUser } from '../../../../store/reducers/UserSlice'

interface Props {
  user:user,
}

const EditForm = (props: Props) => {
  const {user} = props

  const [allOffices, setAllOffices] = useState<office[]>([])
  useEffect(() => {
    const getAllOffices = async () => {
      const res = await fetch(
        `http://localhost:3002/api/office/`
      )
      const officedata = await res.json()
      setAllOffices(officedata)
    }
    getAllOffices()
  }, [])
  const companyId = useAppSelector((state) => state.users.user.companyId)
  const offices = allOffices.filter(
    (office) => office.companyId === companyId
  )
  
  
  const dispatch = useAppDispatch()
  const [selectedOffice, setSelectedOffice] = useState(user.officeId)
  const [newFirstName, setnewFirstName] = React.useState(user.firstName)
  const [newLastName, setNewLastName] = React.useState(user.lastName)
  const [newEmail, setNewEmail] = React.useState(user.email)
  const [changeUser, { isError }] = userAPI.useChangeUserMutation()
  
  const handleEditClose = () =>
  setTimeout(() => dispatch(changeModal({ open: null })), 1000)
  const handleOfficeChange = (event: SelectChangeEvent) => {
    setSelectedOffice(Number(event.target.value))
  }
  
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
      e.preventDefault()
      await changeUser({
        id:user.id,
        email:newEmail,
        firstName:newFirstName,
        lastName:newLastName,
        officeId:selectedOffice
      } as user)
     if (!isError) {
      dispatch(editUser(
        {
          email:newEmail,
          firstName:newFirstName,
          lastName:newLastName,
          officeId:selectedOffice
        }
      ))
     }
      handleEditClose()
  }

  return (
    <Box
      className={styles.modal}
      component='form'
      onSubmit={handleSubmit}
      noValidate
      sx={{ mt: 1, bgcolor: 'background.paper' }}>
         <InputLabel id="office">Офис</InputLabel>
        <Select
          labelId="office"
          id="office"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={selectedOffice.toString()}
          label="Age"
          onChange={handleOfficeChange}
        >
          {offices?.map(office => (<MenuItem value={office.id}>{office.name}</MenuItem>))}
        </Select>
      <TextField
        margin='normal'
        fullWidth
        id='email'
        label='Email Address'
        name='email'
        autoComplete='email'
        autoFocus
        value={newEmail}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setNewEmail(event.target.value)
        }}
        />
      <TextField
        margin='normal'
        fullWidth
        id='firstName'
        label='Имя'
        name='firstName'
        autoFocus
        value={newFirstName}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setnewFirstName(event.target.value)
        }}
        />
      <TextField
        margin='normal'
        fullWidth
        id='secondName'
        label='Фамилия'
        name='secondName'
        autoFocus
        value={newLastName}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setNewLastName(event.target.value)
        }}
        />
      <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
        Сохранить
      </Button>
    </Box>
  )
}

export default EditForm