import { Button, Container, Grid, Modal, Typography } from '@mui/material'
import { useState } from 'react'
import { room, roomAPI } from '../../../hooks/roomService'
import OfficeMenuItem from './OfficeMenuItem'
import RoomCard from './RoomCard/RoomCard'

import styles from './admin.style.module.scss'
import { office, officeAPI } from '../../../hooks/officeService'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import ErrorComponent from '../../Error'
import { changeModal } from '../../../store/reducers/ModalSlice'
import CreateOffice from './CreateModals/CreateOffice'
import CreateRoom from './CreateModals/CreateRoom'

const AdminPage = () => {
  const userOfficeId =
    localStorage.getItem('officeId') != null
      ? Number(localStorage.getItem('officeId'))
      : 1

  const allOffices = officeAPI.useGetAllOfficesQuery(null)
  const allRooms = roomAPI.useGetAllRoomsQuery(null)
  const rooms = allRooms.data ?? []

  const userCompanyId =
    localStorage.getItem('companyId') != null
      ? Number(localStorage.getItem('companyId'))
      : 1
  const officesdata: office[] = allOffices.data ?? []
  const offices = officesdata.filter(
    (office) => office.companyId === userCompanyId
  ) // от это костыыыыль

  const [expanded, setExpanded] = useState<number | false>(false)
  const [selectedOffice, setSelectedOffice] = useState<number>(userOfficeId)

  const handleChange =
    (office: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? office : false)
      setSelectedOffice(office)
    }

  const dispatch = useAppDispatch()
  const handleOfficeCreateOpen = () => {
    dispatch(changeModal({ open: 'createOffice' }))
  }
  const handleRoomCreateOpen = () => {
    dispatch(changeModal({ open: 'createRoom' }))
  }
  const handleClose = () => dispatch(changeModal({ open: null }))

  const user = useAppSelector((state) => state.users.user)
  const createOfficeOpen = useAppSelector(
    (state) => state.modals.open === 'createOffice'
  )
  const createRoomOpen = useAppSelector(
    (state) => state.modals.open === 'createRoom'
  )

  return user.isAdmin ? (
    <>
      <Modal
        open={createOfficeOpen}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <CreateOffice companyId={user.companyId} />
      </Modal>
      <Modal
        open={createRoomOpen}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <CreateRoom officeId={selectedOffice} />
      </Modal>
      <Grid
        container
        direction={'row'}
        sx={{ flexWrap: { sx: 'wrap', sm: 'nowrap' } }}
        className={styles.mainContent}>
        <Grid item className={styles.officeMenu}>
          <Typography variant='h5' gutterBottom p={1}>
            Выбор офиса:
          </Typography>
          {offices.map((office) => (
            <>
              <OfficeMenuItem
                key={office.id}
                {...{ ...office, expanded, handleChange, selectedOffice }}
              />
            </>
          ))}
          <Button
            type='button'
            variant='outlined'
            onClick={handleOfficeCreateOpen}>
            Создать офис
          </Button>
        </Grid>
        <Grid item>
          <Grid container spacing={2}>
            {rooms.map(
              (room) =>
                room.officeId === selectedOffice && (
                  <Grid item>
                    <Container className={styles.roomContainer}>
                      <RoomCard {...room} />
                    </Container>
                  </Grid>
                )
            )}
          </Grid>
          {expanded ? (
            <Button
              type='button'
              variant='outlined'
              onClick={handleRoomCreateOpen}>
              Создать переговорку
            </Button>
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
    </>
  ) : (
    <ErrorComponent errorText='Вы не администратор' />
  )
}

export default AdminPage
