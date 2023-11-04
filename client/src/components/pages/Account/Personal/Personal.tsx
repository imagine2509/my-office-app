import {
  Avatar,
  Box,
  Button,
  Container,
  Modal,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'

import styles from '../profile.module.scss'
import EditForm from './EditForm'

type Props = {
  id: number
  firstName: string
  lastName: string
  email: string
  officeId: number | null
  companyId: number | null
}

function Personal(props: Props) {
  const { id, firstName, lastName, email, officeId, companyId } = props
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Container className={styles.contactContainer}>
      <Box className={styles.avatarBox}>
        <Avatar alt={firstName + lastName} src='/static/images/avatar/2.jpg' />
        <Typography className={styles.contactText}>
          {firstName + ' ' + lastName}
        </Typography>
      </Box>
      <Box className={styles.contactBox}>
        <Typography className={styles.contactText}>Офис: {officeId}</Typography>
        <Typography className={styles.contactText}>Контакты:</Typography>
        <Typography className={styles.contactText}>E-mail: {email}</Typography>
        <Button
          type='button'
          onClick={handleOpen}
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}>
          Изменить
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'>
          <EditForm />
        </Modal>
      </Box>
    </Container>
  )
}

export default Personal
