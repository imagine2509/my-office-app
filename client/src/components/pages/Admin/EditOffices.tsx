import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Box,
  TextField,
  Button,
} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

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

const EditOffices = (props: Props) => {
  const { name, address, id, expanded, handleChange, selectedOffice } = props

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.currentTarget))
    console.log(data)

    // try {
    //   const res = await fetch('http://localhost:3002/api/offices/edit', {
    //     method: 'POST',
    //     credentials: 'include',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(data),
    //   })
    //   const userData = await res.json()
    // } catch (err) {
    //   console.log(err)
    // }
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
        <Box
          component={'form'}
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='name'
            label='Наименование'
            name='officeName'
            autoFocus
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='address'
            label='Адрес'
            id='address'
          />
          <Button
            type='submit'
            fullWidth
            // onClick={handleEditOfficeClose}
            variant='contained'
            sx={{ mt: 3, mb: 2 }}>
            Сохранить
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}

export default EditOffices
