import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export interface user {
  id: number,
  firstName : string,
  lastName: string
  email: string,
  officeId: number,
  isActivated: boolean,
  isApproved: boolean,
}

  export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3002/api/' }),
    endpoints: (builder) => ({
      getCompanyUsers: builder.query<user[], number>({
             query: (companyId) => ({
               url: `user/${companyId}`,
               method: 'GET',
             }),
           }),
      deleteUser: builder.mutation<user,number>({
        query: (id) => ({
          url: `user/${id}`,
          method: 'DELETE'
        })
      }),
      changeUser: builder.mutation<user,user>({
        query: (user) => ({
          url: `user/${user.id}`,
          method: 'PUT',
          body: user
        })
      }),
      getUsersByCompany: builder.mutation<user, number>({
        query: (companyId) => ({
          url: `user/${companyId}`,
          method: 'GET',
        }),
      }),
    }),
  })