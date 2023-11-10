import { Grid, Typography } from '@mui/material'
import { useState } from 'react'
import { office, officeAPI } from '../../../hooks/officeService'
import { roomAPI } from '../../../hooks/roomService'
import OfficeMenuItem from './OfficeMenuItem'
import RoomCard from './RoomCard/RoomCard'
import styles from './mainContent.styles.module.scss'



function MainContent() {
  //Как добавить офис:
  //хук
  const [ addOffice , {} ] = officeAPI.useAddOfficeMutation()
  const [ getOfficeMutation , {} ] = officeAPI.useGetOfficeMutation()
  //хэндлер
  const handleaddOffice = async () => {
    await addOffice({
      address: 'г. Москва, ул. Ленина, д.1',
      name: 'Офис №1',
    } as office)
    // officeAPI.usePrefetch
  }

  const handlegetOffice = async (id: number) => {
    try {
      const result = await getOfficeMutation(id);
      if ('data' in result) {
        // Обработка успешного запроса
        const data = result.data;
        console.log(data);
      } else {
        // Обработка ошибки
        const error = result.error;
        console.error(error);
      }
    } catch (error) {
      // Ловим любые другие ошибки, которые могут возникнуть во время выполнения запроса
      console.error(error);
    }
  };

  const allOffices = officeAPI.useGetAllOfficesQuery(null)
  const demoOffices = allOffices.data ?? []
  const allRooms = roomAPI.useGetAllRoomsQuery(null)
  const demoRooms = allRooms.data ?? []
  const userOfficeId = localStorage.getItem('officeId') != null ? Number(localStorage.getItem('officeId')) : 1



  const [expanded, setExpanded] = useState<number | false>(false)
  const [selectedOffice, setSelectedOffice] = useState<number>(
    userOfficeId
  )

  const handleChange =
    (office: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? office : false)
      setSelectedOffice(office)
    }

  return (
    <Grid
      container
      direction={'row'}
      sx={{ flexWrap: { sx: 'wrap', sm: 'nowrap' } }}
      className={styles.mainContent}>
      <Grid item className={styles.officeMenu} mr={2} mb={2}>
        <button onClick={handleaddOffice}>Добавить офис</button>
        <button onClick={()=>handlegetOffice(1)}>Получить офис с id = 1</button>
        <Typography variant='h5' gutterBottom p={1}>
          Выбор офиса:
        </Typography>
        {
          demoOffices.map((office) => (
          <OfficeMenuItem {...{ ...office, expanded, handleChange, selectedOffice }}/>
        ))
        }
      </Grid>
      <Grid item>
        <Grid container spacing={2}>
          {demoRooms.map(
            (room) => room.officeId === selectedOffice && <RoomCard {...room} />
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default MainContent
