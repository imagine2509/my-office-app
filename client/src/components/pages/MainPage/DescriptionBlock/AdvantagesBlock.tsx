import { Box, Container, Typography } from '@mui/material'
import BuildIcon from '@mui/icons-material/Build'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import FeedbackIcon from '@mui/icons-material/Feedback'
import React from 'react'

import styles from './description.style.module.scss'

type AdvantageElement = {
  icon: React.ElementType
  advantage: string
  description: string
}

const elements: AdvantageElement[] = [
  {
    icon: BuildIcon,
    advantage: 'Удобство',
    description:
      'Вы всегда уверены в том, что нужная переговорная свободна в нужное вам время',
  },
  {
    icon: AccessTimeIcon,
    advantage: 'Экономия времени',
    description: 'Организуйте совещания без задержек на настройку',
  },
  {
    icon: FeedbackIcon,
    advantage: 'Информация',
    description: 'Загрузка переговорных комнат можно анализировать',
  },
  {
    icon: CurrencyExchangeIcon,
    advantage: 'Деньги',
    description: 'Ваши подразделения работают быстрее и эффективнее',
  },
]

const AdvantagesBlock = () => {
  return (
    <>
      <Typography
        className={styles.advantagesMainHeader}
        component={'h3'}
        variant='h5'>
        Благодаря нашей системе вы получаете:
      </Typography>
      <Container component={'div'} className={styles.advantagesContainer}>
        {elements.map((element) => (
          <Box component={'div'} className={styles.advantagesBlock}>
            <Box component={'svg'} className={styles.advantagesIcon}>
              {React.createElement(element.icon)}
            </Box>
            <Typography
              component={'h4'}
              variant='h5'
              className={styles.advantagesHeader}>
              {element.advantage}
            </Typography>
            <Typography className={styles.advantagesText}>
              {element.description}
            </Typography>
          </Box>
        ))}
      </Container>
    </>
  )
}

export default AdvantagesBlock
