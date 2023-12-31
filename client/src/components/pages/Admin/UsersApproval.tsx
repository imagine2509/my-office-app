/* eslint-disable no-empty-pattern */
import React from 'react'
import { useAppSelector } from '../../../hooks/redux'
import { user, userAPI } from '../../../hooks/userService'
import {
  List,
  ListSubheader,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  IconButton,
  Button,
  Box,
} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate } from 'react-router-dom'
import styles from './users.style.module.scss'

function UsersApproval() {
  const companyId = useAppSelector((state) => state.users.user.companyId)
  const [deleteUser, {}] = userAPI.useDeleteUserMutation()
  const [changeUser, {}] = userAPI.useChangeUserMutation()
  const users = userAPI.useGetCompanyUsersQuery(companyId)

  const navigate = useNavigate()

  const handleApprove =
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (user: user) => async (_event: React.ChangeEvent<HTMLInputElement>) => {
      await changeUser({ ...user, isApproved: !user.isApproved })
      await users.refetch()
    }

  const handleDelete = async (user: user) => {
    await deleteUser(user.id)
    await users.refetch()
  }

  return (
    <Box className={styles.mainContent}>
      <List
        sx={{ bgcolor: 'background.secondary' }}
        subheader={<ListSubheader>Активация пользователей</ListSubheader>}
        className={styles.usersList}>
        {users.data?.map((user) => {
          return (
            <ListItem key={user.id} className={styles.usersListItem}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText
                id='email'
                className={styles.emailItem}
                primary={user.email}
              />
              <ListItemText id='name' primary={user.firstName + '  '} />
              <Switch
                key={user.id}
                onChange={handleApprove(user)}
                checked={user.isApproved}
              />
              <IconButton
                edge='end'
                aria-label='delete'
                onClick={() => handleDelete(user)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          )
        })}
        <Button
          type='button'
          variant='outlined'
          onClick={(event) => {
            event.preventDefault()
            navigate('/admin')
          }}>
          Вернуться
        </Button>
      </List>
    </Box>
  )
}

export default UsersApproval
