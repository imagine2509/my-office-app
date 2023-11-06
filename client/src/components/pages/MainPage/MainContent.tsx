import {Grid, Typography } from '@mui/material'
import React from 'react'
import RoomCard from './RoomCard';
import styles from './mainContent.styles.module.scss'
import OfficeMenuItem from './OfficeMenuItem';

const demoOffices = 
[
{id:1, name: "Главный офис", address: "г. Москва, ул. Петровка, д. 2, этаж 1"},
{id:2, name: "Склад", address: "г.Москва, ул. Электродная, д. 3Б"},
{id:3, name: "Колл-центр" ,address: "г.Новосибирск, Красный проспект, 86, оф. 14"},
{id:4, name: "Офис 'Север'", address: "г Москва, Сигнальный проезд, 7Б, стр.2"},
{id:5, name: "Офис 'Подмосковье'", address: "г. Наро-Фоминск, ул Профсоюзная, д. 37А, офис 407"},
]

const demoRooms =
[
    {officeId:1 , name: "Встречи У Ашота", amount: 24, video: true ,
    description: "Переговорка в французском стиле с клопами и картинами с видами Парижа. Видеосвязь присутствует. Туалет в соседнем здании (7 минут пешком + ожидание лифта). Штраф за курение : 10 плетей.",
    photo: "src/assets/img/rooms/1.png"
    },
    {officeId:1 , name: "Подвальный рейв", amount: 180, video: false ,
    description: "Самая вместительная переговорка нашего офиса. Внимание: находится на -1 этаже (кнопка лифта 'гараж'). Указано количество мест при отсутствии автомобилей",
    photo: "src/assets/img/rooms/2.png"
    },
    {officeId:1 , name: "Переговорка руководителей 'Олимп'", amount: 12, video: true ,
    description: "Личный конференс-терминал для каждого посетителя, 12 массажных кресел, минибар, сауна. Только для руководителей.",
    photo: "src/assets/img/rooms/3.png"
    },
    {officeId:1 , name: "Столовая", amount: 8, video: false ,
    description: "Ненуашо?",
    photo: "src/assets/img/rooms/4.png"
    },
    {officeId:2 , name: "Курилка 'За углом'", amount: 20, video: false ,
    description: "Переговорка на свежем воздухе в никотиновом дыму и вишнёвом саду. Способствует улучшению здоровья и ухудщению одновременно",
    photo: "src/assets/img/rooms/5.png"
    },
    {officeId:3 , name: "Meeting room 1", amount: 48, video: true ,
    description: "Основная комната обучения. Бронь возможна только с правами админисратора.",
    photo: "src/assets/img/rooms/6.png"
    },
    {officeId:3 , name: "Meeting room 2", amount: 12, video: true ,
    description: "Правое крыло четвертого корпуса на главноё аллее. После стеклянных дверей: налево, вверх 1этаж, направо, комната с надписью 'Проктолог'",
    photo: "src/assets/img/rooms/7.png"
    },
    {officeId:4 , name: "Переговорка 'Америка'", amount: 16, video: true ,
    description: "Стильная переговорная комната, оформленная в стиле индейского поселения.",
    photo: "src/assets/img/rooms/8.png"
    },
    {officeId:5 , name: "Переговорка 'Берёзка'", amount: 6, video: false ,
    description: "",
    photo: "src/assets/img/rooms/9.png"
    }
]

const demouser = {
    id:1,
    name: "Александр",
    defaulOfficeId:1
}

function MainContent() {

const [expanded, setExpanded] = React.useState<number | false>(false);
const [selectedOffice, setSelectedOffice] = React.useState<number>(demouser.defaulOfficeId);


const handleChange = (office: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
setExpanded(isExpanded ? office : false);
setSelectedOffice(office)
};

return (
<Grid container direction={'row'} sx={{ flexWrap: {sx:'wrap',sm: 'nowrap' }}} className={styles.mainContent}>
  <Grid item className={styles.officeMenu} mr={2} mb={2}>
    <Typography variant="h5" gutterBottom p={1}>
      Выбор офиса:
    </Typography>
    {demoOffices.map(office => <OfficeMenuItem {...{...office, expanded, handleChange,selectedOffice}}/>)}
  </Grid>
  <Grid item>
    <Grid container spacing={2}>
      {demoRooms.map(room => room.officeId===selectedOffice && <RoomCard {...room}/>)}
    </Grid>
  </Grid>
</Grid>
)

}

export default MainContent
