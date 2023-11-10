import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export interface office {
  id: number ,
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
      addOffice: builder.mutation<office,office>({
        query: (office) => ({
          url: `office`,
          method: 'POST',
          body: office
        })
      }),
      deleteOffice: builder.mutation<office,number>({
        query: (id) => ({
          url: `office/${id}`,
          method: 'DELETE'
        })
      }),
      changeOffice: builder.mutation<office,office>({
        query: (office) => ({
          url: `/office/${office.id}`,
          method: 'PUT',
          body: office
        })
      }),
      getOffice: builder.mutation<office, number>({
        query: (id) => ({
          url: `office/${id}`,
          method: 'GET',
        }),
      }),
    }),
  })