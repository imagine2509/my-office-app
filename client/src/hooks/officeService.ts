import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

/* export const officeAPI = createApi({
    reducerPath: 'officeAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://127.0.0.1:3002/api/'}),
    endpoints: (builder) => ({
        getAllOffices: builder.query({
            query: () => ({
                url: '/office'
            })
        })
    })
}) */

export const officeAPI = createApi({
    reducerPath: 'officeAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:3002/api/' }),
    endpoints: (builder) => ({
      getAllOffices: builder.query({
        query: () => `office`,
      }),
    }),
  })