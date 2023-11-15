/* eslint-disable no-empty-pattern */
import { Box, TextField, Button } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import { changeModal } from '../../../../store/reducers/ModalSlice'
import { office, officeAPI } from '../../../../hooks/officeService'
import styles from '../admin.style.module.scss'
import React from 'react'

type ModalProps = {
  companyId: number
}

const CreateOffice = ({ companyId }: ModalProps) => {
  //для контролируемого ввода
  const [officeName, setOfficeName] = React.useState('')
  const [officeAddress, setOfficeAddress] = React.useState('')
  //
  const allOffices = officeAPI.useGetAllOfficesQuery(null)
  const [addOffice, {}] = officeAPI.useAddOfficeMutation()

  const user = useAppSelector((state) => state.users.user)

  companyId = user.companyId

  const dispatch = useAppDispatch()

  const handleEditOfficeClose = () =>
    setTimeout(() => dispatch(changeModal({ open: null })), 1000)

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()
    await addOffice({
      name: officeName,
      address: officeAddress,
      companyId,
    } as office)
    allOffices.refetch()
    handleEditOfficeClose()
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
        label='Наименование'
        value={officeName}
        name={officeName}
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
        name={officeAddress}
        label='Адрес'
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setOfficeAddress(event.target.value)
        }}
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

export default CreateOffice
