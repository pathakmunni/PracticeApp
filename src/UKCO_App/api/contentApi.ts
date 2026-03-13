import { baseApi } from './baseApi'

export const contentApi = baseApi.injectEndpoints({

  endpoints: builder => ({

    getUnits: builder.query({
      query: () => ({
        method: 'POST',
        body: {
          query: `
           query GetUnits {
             units {
               id
               title
               sections {
                 sectionId
                 title
               }
             }
           }
          `
        }
      })
    })

  })
})

export const { useGetUnitsQuery } = contentApi