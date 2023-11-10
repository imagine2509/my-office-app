import { Grid, Typography } from '@mui/material'
import RoomCard from './RoomCard/RoomCard'
import styles from './mainContent.styles.module.scss'
import OfficeMenuItem from './OfficeMenuItem'
import { office, officeAPI } from '../../../hooks/officeService'
import { roomAPI } from '../../../hooks/roomService'
import { useState } from 'react'

function MainContent() {

  const allOffices = officeAPI.useGetAllOfficesQuery(null)
  const demoOffices = allOffices.data ?? []
  const allRooms = roomAPI.useGetAllRoomsQuery(null)

  // Как создать новый офис:
  const [addOffice , {}] = officeAPI.useAddOfficeMutation() //что то типа юзстейта
  const handleAddOffice = async (newOffice:office) => {
    await addOffice(newOffice)
    allOffices.refetch()
  }
  // Как изменить офис :
  const [changeOffice, {}] = officeAPI.useChangeOfficeMutation()
  const handleChangeOffice = async (office: office) => {
    await changeOffice(office)
    allOffices.refetch()
  }
  //Как удалить офис :
  const [deleteOffice, {}] = officeAPI.useDeleteOfficeMutation()
  const handleDeleteOffice = async (id: number) => {
    await deleteOffice(id)
    allOffices.refetch()
  }
  // Как выбрать офис :
  const [getOfficeById, {}] = officeAPI.useGetOfficeMutation()
  const handleGetOffice = async (id: number) => {
    const result = await getOfficeById(id)
    if ('data' in result) {
      const oneOffice = result.data;
      console.log(oneOffice,'<-- это офис =) ');
    }
  }

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
      <button onClick={()=>handleAddOffice({ address: 'г. Москва, ул. Красная, д. 1',name: 'Офис №1'} as office)}>добавить офис</button>
      <button onClick={()=> handleChangeOffice({id:11,address:'Жопа мира',name:'Бутово'})}>изменить офис</button>
      <button onClick={()=> handleDeleteOffice(11)}>удалить офис</button>
      <button onClick={()=>handleGetOffice(1)}>получить офис по айди</button>
      
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
