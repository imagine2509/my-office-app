import { Container, Typography } from '@mui/material'
import AdvantagesBlock from './AdvantagesBlock'
import HeaderDescription from './HeaderDecription'
import OurClients from './OurClients'

const DescriptionBlock = () => {
  return (
    <Container component={'article'}>
      <HeaderDescription />
      <Container component={'section'}>
        <AdvantagesBlock />
      </Container>
      <OurClients />
    </Container>
  )
}

export default DescriptionBlock
