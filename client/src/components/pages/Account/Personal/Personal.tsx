import React from 'react'

type Props = {
  id: number
  firstName: string | null
  lastName: string | null
  email: string
  officeId: number | null
  companyId: number | null
}

function Personal({}: Props) {
  return <div>Personal</div>
}

export default Personal
