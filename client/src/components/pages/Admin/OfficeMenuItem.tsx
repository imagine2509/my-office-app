/* eslint-disable no-empty-pattern */
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Modal,
  Typography,
} from '@mui/material'
import React from 'react'
import CheckIcon from '@mui/icons-material/Check'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import styles from './admin.style.module.scss'
import EditOffice from './EditModals/EditOffices'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { changeModal } from '../../../store/reducers/ModalSlice'
import { officeAPI } from '../../../hooks/officeService'

interface Props {
  name: string
  address: string
  id?: number | undefined
  expanded: number | false
  handleChange: (
    office: number
  ) => (event: React.SyntheticEvent, isExpanded: boolean) => void
  selectedOffice: number
}

function OfficeMenuItem(props: Props) {
  const { name, address, id, expanded, handleChange, selectedOffice } = props
  const [deleteOffice, {}] = officeAPI.useDeleteOfficeMutation()
  const allOffices = officeAPI.useGetAllOfficesQuery(null)

  const handleDeleteOffice = async (id: number | undefined) => {
    if (id) {
      await deleteOffice(id)
      allOffices.refetch()
    }
  }

  const dispatch = useAppDispatch()
  const officeEditOpen = useAppSelector(
    (state) => state.modals.open === 'editOffice' && state.modals.id === id
  )

  const handleOfficeEditClose = () => {
    const action = changeModal({ open: null })
    dispatch(action)
  }

  const handleOfficeEditOpen = (id: number | undefined) => {
    if (id) {
      const action = changeModal({ open: 'editOffice', id })
      dispatch(action)
    }
  }

  return (
    <Accordion expanded={expanded === id} onChange={handleChange(id)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} id={`${id} content`}>
        <Typography>
          {selectedOffice === id && <CheckIcon />}
          {name}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{address}</Typography>
      </AccordionDetails>
      <AccordionActions>
        <Button
          type='button'
          variant='outlined'
          onClick={() => handleOfficeEditOpen(id)}
          key={`editOffice${id}`}
          className={styles.editButton}>
          Редактировать
        </Button>
        <Button
          type='button'
          variant='outlined'
          onClick={() => handleDeleteOffice(id)}
          key={`deleteOffice${id}`}
          className={styles.deleteButton}>
          Удалить
        </Button>
        <Modal
          key={id}
          open={officeEditOpen}
          onClose={() => handleOfficeEditClose()}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'>
          <EditOffice id={id} name={name} address={address} />
        </Modal>
      </AccordionActions>
    </Accordion>
  )
}

export default OfficeMenuItem
