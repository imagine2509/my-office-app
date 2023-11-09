import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export interface room {
  id: number,
  address : string,
  amount: number ,
  video: boolean,
  description: string,
  photo: string,
  officeId: number,
  name : string,
}

export const roomAPI = createApi({
    reducerPath: 'roomAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3002/api/' }),
    endpoints: (builder) => ({
      getAllRooms: builder.query<room[],null>({
        query: () => `room`,
      }),
    }),
  })