import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material'
import React from 'react'
import CheckIcon from '@mui/icons-material/Check'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

interface Props {
  name: string
  address: string
  id?: number | undefined
  expanded: number | false
  handleChange: (
    office: number | undefined
  ) => (event: React.SyntheticEvent, isExpanded: boolean) => void
  selectedOffice: number
}

function OfficeMenuItem(props: Props) {
  const { name, address, id, expanded, handleChange, selectedOffice } = props

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
    </Accordion>
  )
}

export default OfficeMenuItem
