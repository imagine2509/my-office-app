import { useEffect } from 'react'
import { useAppDispatch } from '../../../hooks/redux'
import { checkUser } from '../../../store/reducers/UserSlice'
import { User } from '../../../models/User'

const CheckUser = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const checkAccess = async () => {
      const accessToken = localStorage.getItem('accessToken')
      const res = await fetch('http://localhost:3002/api/user/access', {
        headers: {
          'authorization': `${accessToken}`,
        },
      })
      const status = await res.status
      if (status === 200) {
        const userData: User = {
          id: Number(localStorage.getItem('id')),
          firstName: localStorage.getItem('firstName') ?? '',
          lastName: localStorage.getItem('lastName') ?? '',
          email: localStorage.getItem('email') ?? '',
          password: localStorage.getItem('password') ?? '',
          officeId: Number(localStorage.getItem('officeId')),
          companyId: Number(localStorage.getItem('companyId')),
          isAdmin: !!localStorage.getItem('isAdmin'),
        }
        dispatch(checkUser(userData))
      }
    }
    checkAccess()
  }, [])

  return <></>
}

export default CheckUser
