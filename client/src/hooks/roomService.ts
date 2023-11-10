import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export interface room {
  id: number,
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
      addRoom: builder.mutation<room,room>({
        query: (room) => ({
          url: `room`,
          method: 'POST',
          body: room
        })
      }),
      deleteRoom: builder.mutation<room,number>({
        query: (id) => ({
          url: `room/${id}`,
          method: 'DELETE'
        })
      }),
      changeRoom: builder.mutation<room,room>({
        query: (room) => ({
          url: `/room/${room.id}`,
          method: 'PUT',
          body: room
        })
      }),
      getRoom: builder.mutation<room, number>({
        query: (id) => ({
          url: `room/${id}`,
          method: 'GET',
        }),
      }),
    }),
  })