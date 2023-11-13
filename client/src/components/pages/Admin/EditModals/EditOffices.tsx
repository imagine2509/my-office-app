/* eslint-disable no-empty-pattern */
import { Box, TextField, Button } from '@mui/material'

import { useAppDispatch } from '../../../../hooks/redux'
import { changeModal } from '../../../../store/reducers/ModalSlice'
import { office, officeAPI } from '../../../../hooks/officeService'
import styles from '../admin.style.module.scss'
import React from 'react'

type ModalProps = {
  id: number
  name: string
  address: string
}

const EditOffice = ({ id, name, address }: ModalProps) => {
  //для контролируемого ввода
  const [officeName, setOfficeName] = React.useState(name)
  const [officeAddress, setOfficeAddress] = React.useState(address)
  //
  const allOffices = officeAPI.useGetAllOfficesQuery(null)
  const [changeOffice, {}] = officeAPI.useChangeOfficeMutation()

  const dispatch = useAppDispatch()

  const handleEditOfficeClose = () =>
    setTimeout(() => dispatch(changeModal({ open: null })), 1000)

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()
    await changeOffice({
      name: officeName,
      address: officeAddress,
      id,
    } as office)
    allOffices.refetch()
    handleEditOfficeClose()
  }

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      noValidate
      sx={{ mt: 1 }}
      className={styles.modal}>
      <TextField
        margin='normal'
        required
        fullWidth
        id={`${id}`}
        label='Наименование'
        value={officeName}
        name={name}
        autoFocus
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setOfficeName(event.target.value)
        }}
      />
      <TextField
        margin='normal'
        required
        fullWidth
        value={officeAddress}
        name={address}
        label='Адрес'
        id={address}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setOfficeAddress(event.target.value)
        }}
      />
      <TextField
        required
        id='outlined-required'
        label='Required'
        defaultValue='Hello World'
      />
      <Button
        type='submit'
        fullWidth
        onClick={handleEditOfficeClose}
        variant='contained'
        sx={{ mt: 3, mb: 2 }}>
        Сохранить
      </Button>
    </Box>
  )
}

export default EditOffice
