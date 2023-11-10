import { Box, TextField, Button } from '@mui/material'

import { useAppDispatch } from '../../../../hooks/redux'
import { closeModal } from '../../../../store/reducers/ModalSlice'

import styles from '../admin.style.module.scss'

type ModalProps = {
  id: number
  name: string
  address: string
}

const EditOffice = ({ id, name, address }: ModalProps) => {
  const dispatch = useAppDispatch()

  const handleEditOfficeClose = () =>
    setTimeout(() => dispatch(closeModal(`editOffice`)), 1000)

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()
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
        value={name}
        name={name}
        autoFocus
      />
      <TextField
        margin='normal'
        required
        fullWidth
        value={address}
        name={address}
        label='Адрес'
        id={address}
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
