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

interface Props {
  name: string
  address: string
  id: number
  expanded: number | false
  handleChange: (
    office: number
  ) => (event: React.SyntheticEvent, isExpanded: boolean) => void
  selectedOffice: number
}

function OfficeMenuItem(props: Props) {
  const { name, address, id, expanded, handleChange, selectedOffice } = props

  const dispatch = useAppDispatch()
  const officeEditOpen = useAppSelector(
    (state) => state.modals.open === 'editOffice' && state.modals.id === id
  )

  const handleOfficeEditClose = () => {
    const action = changeModal({ open: null })
    console.log('Dispatching action:', action)
    dispatch(action)
  }

  const handleOfficeEditOpen = (id: number) => {
    console.log('Opening modal')
    const action = changeModal({ open: 'editOffice', id })
    console.log('Dispatching action:', action)
    dispatch(action)
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
