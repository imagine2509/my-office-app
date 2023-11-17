import {
  Avatar,
  Box,
  Button,
  Container,
  Modal,
  Typography,
} from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import { changeModal } from '../../../../store/reducers/ModalSlice'
import { officeAPI } from '../../../../hooks/officeService'
import EditForm from './EditForm'

import styles from '../profile.module.scss'

function Personal() {
  const dispatch = useAppDispatch()
  const editOpen = useAppSelector((state) => state.modals.open === 'edit')
  const handleEditOpen = () => dispatch(changeModal({ open: 'edit' }))
  const handleEditClose = () => dispatch(changeModal({ open: null }))

  const user = useAppSelector((state) => state.users.user)

  const officeName = officeAPI.useGetOfficeQuery(user.officeId)

  return (
    <Container className={styles.contactContainer}>
      <Box className={styles.avatarBox}>
        <Avatar
          alt={user.firstName + user.lastName}
          src='/static/images/avatar/2.jpg'
          className={styles.avatar}
        />
        <Typography className={styles.contactText}>
          {user.firstName + ' ' + user.lastName}
        </Typography>
      </Box>
      <Box className={styles.contactBox}>
        <Typography className={styles.contactText}>
          {officeName.isLoading ? (
            <Typography className={styles.contactText}>Загрузка...</Typography>
          ) : officeName.isError ? (
            <Typography className={styles.contactText}>
              Ошибка при загрузке
            </Typography>
          ) : (
            <Typography className={styles.contactText}>
              Офис: {officeName.data?.name}
            </Typography>
          )}
        </Typography>
        <Typography className={styles.contactText}>
          E-mail: {user.email}
        </Typography>
        <Button
          type='button'
          onClick={handleEditOpen}
          variant='contained'
          className={styles.editProfileButton}>
          Изменить
        </Button>
        <Modal
          open={editOpen}
          onClose={handleEditClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'>
          <EditForm />
        </Modal>
      </Box>
    </Container>
  )
}

export default Personal
