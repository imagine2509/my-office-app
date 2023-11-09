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
    }),
  })