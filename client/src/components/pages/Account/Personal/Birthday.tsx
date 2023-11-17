import { useEffect, useState } from 'react'
import { useAppSelector } from '../../../../hooks/redux'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Container,
} from '@mui/material'

import styles from '../profile.module.scss'

type DatesOfBirth = {
  firstName: string
  lastName: string
  birthDate: string
}

type RowData = {
  name: string
  birthDate: string
}

const Birthday = (): JSX.Element => {
  const [dates, setDates] = useState<DatesOfBirth[]>([])
  const user = useAppSelector((state) => state.users.user)

  useEffect(() => {
    const fetchBirth = async () => {
      if (user.id) {
        const allBirthDate = await fetch(
          `http://localhost:3002/birth/${user.id}`
        )
        const result = await allBirthDate.json()
        setDates(result)
      }
    }
    fetchBirth()
  }, [user])

  function createData(name: string, birthDate: string): RowData {
    const parsedDate = new Date(birthDate)
    return { name, birthDate: parsedDate.toLocaleDateString() }
  }
  const rows: RowData[] = []
  dates.forEach((element) => {
    rows.push(
      createData(`${element.firstName} ${element.lastName}`, element.birthDate)
    )
  })

  return (
    <Container className={styles.birthDayContainer}>
      <Typography component={'h3'} variant='h5'>
        Дни рождения коллег:
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label='Дни рождения коллег'>
          <TableHead>
            <TableRow>
              <TableCell>Имя</TableCell>
              <TableCell align='right'>День рождения</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component='th' scope='row'>
                  {row.name}
                </TableCell>
                <TableCell align='right'>{row.birthDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default Birthday
