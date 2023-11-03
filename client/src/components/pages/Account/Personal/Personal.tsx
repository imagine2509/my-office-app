import React from 'react'

type Props = {
  id: number
  firstName: string | null
  lastName: string | null
  email: string
  officeId: number | null
  companyId: number | null
}

function Personal({
  id = 1,
  firstName = null,
  lastName = null,
  email = 'seva@123.com',
  officeId = null,
  companyId = null,
}: Props) {
  return <div>Personal</div>
}

export default Personal
