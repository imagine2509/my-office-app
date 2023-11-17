import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ActivateWindow = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const activation = async () => {
      const data = window.location.href
      const res = data.replace('5173', '3002')
      await fetch(`${res}`)
    }
    activation()
    navigate('/')
  })

  return <></>
}

export default ActivateWindow
