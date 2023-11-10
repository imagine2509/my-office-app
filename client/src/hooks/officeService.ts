import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export interface office {
  id: number,
  address : string,
  name: string ,
}

export const officeAPI = createApi({
    reducerPath: 'officeAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3002/api/' }),
    endpoints: (builder) => ({
      getAllOffices: builder.query<office[],null>({
        query: () => `office`,
      }),
      getOffice: builder.mutation<office, number>({
        query: (id) => ({
          url: `office/${id}`,
          method: 'GET',
          credentials: 'include',
          mode: 'cors',
        }),
      }),
      addOffice: builder.mutation<office,office>({
        query: (office) => ({
          url: `office`,
          method: 'POST',
          body: office,
          credentials: 'include',
          mode: 'cors',
/*           headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Max-Age': '86400',
            'Access-Control-Expose-Headers': 'Content-Type, Authorization',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Max-Age': '86400',
          } */
        }),
      }),
      updateOffice: builder.mutation<office,office>({
        query: (office) => ({
          url: `office/${office.id}`,
          method: 'PUT',
          body: office,
          credentials: 'include',
          mode: 'cors',
        }),
      }),
    }),
  })