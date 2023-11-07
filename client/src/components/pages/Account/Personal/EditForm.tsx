import {
  Box,
  Button,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
import { useState } from 'react'

import styles from '../profile.module.scss'

const offices = ['Moscow', 'Saint-Peterburg', 'Belgrade']

const EditForm = () => {
  //   useEffect(() => {    //TODO: add office fetch to DB
  //     return () => {
  //       second
  //     }
  //   }, [])

  const [office, setOffice] = useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setOffice(event.target.value)
  }

  const handleSubmit = () => {
    console.log(office)
  }

  return (
    <Box
      className={styles.modal}
      component='form'
      onSubmit={handleSubmit}
      noValidate
      sx={{ mt: 1, bgcolor: 'background.paper' }}>
      <Select
        className={styles.officeSelect}
        value={office}
        onChange={handleChange}
        displayEmpty>
        <MenuItem value=''>
          <em>None</em>
        </MenuItem>
        {offices.map((office) => (
          <MenuItem value={office}>{office}</MenuItem>
        ))}
      </Select>
      <FormHelperText>Choose office</FormHelperText>

      <TextField
        margin='normal'
        fullWidth
        id='email'
        label='Email Address'
        name='email'
        autoComplete='email'
        autoFocus
      />
      <TextField
        margin='normal'
        fullWidth
        id='firstName'
        label='Имя'
        name='firstName'
        autoFocus
      />
      <TextField
        margin='normal'
        fullWidth
        id='secondName'
        label='Фамилия'
        name='secondName'
        autoFocus
      />
      <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
        Сохранить
      </Button>
    </Box>
  )
}

export default EditForm
