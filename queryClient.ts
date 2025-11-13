// import { View, Text } from 'react-native'
// import React from 'react'
// import AsyncStorage from "@react-native-async-storage/async-storage"
// import { QueryClient } from '@tanstack/react-query'
// import { PersistQueryClientProvider, createAsyncStoragePersister } from "@tanstack/react-query-persist-client"

// export const queryClient = new QueryClient({
//     defaultOptions: {
//         queries: {
//             staleTime: 1000 * 60 * 5,
//             retry: 3
//         }
//     }
// })

// const asyncStoragePersister = createAsyncStoragePersister({
//     storage: AsyncStorage
// })

// export const QueryProvider = ({ children } : { children: React.ReactNode }) => (
//     <PersistQueryClientProvider client={queryClient} persistOptions={{ persister: asyncStoragePersister }}>
//         {children}
//     </PersistQueryClientProvider>
// )