import { Button, Grid, Typography } from "@mui/material"
import { useState } from "react"
import { officeAPI } from "../../../hooks/officeService"
import { roomAPI } from "../../../hooks/roomService"
import OfficeMenuItem from "./OfficeMenuItem"
import RoomCard from "./RoomCard/RoomCard"

import styles from './admin.style.module.scss'

const AdminPage = () => {
    const allOffices = officeAPI.useGetAllOfficesQuery(null)
    const offices = allOffices.data ?? []
    const allRooms = roomAPI.useGetAllRoomsQuery(null)
    const rooms = allRooms.data ?? []
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
                <Typography variant='h5' gutterBottom p={1}>
                    Выбор офиса:
                </Typography>
                {
                    offices.map((office) => (
                        <OfficeMenuItem {...{ ...office, expanded, handleChange, selectedOffice }} />
                    ))
                }
                <Button type="button" variant="outlined" className={styles.editButton}>Редактировать</Button>
            </Grid>
            <Grid item>
                <Grid container spacing={2}>
                    {rooms.map(
                        (room) => room.officeId === selectedOffice && <RoomCard {...room} />
                    )}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default AdminPage