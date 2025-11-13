import { useFocusEffect } from 'expo-router'
import { useCallback, useRef } from 'react'

export default function useRefetchOnFocus(refetch: () => void) {
    const enabledRef = useRef(false)

    useFocusEffect(
        useCallback(() => {
            if (enabledRef.current) {
                refetch()
            } else {
                enabledRef.current = true
            }
        }, [refetch])
    )
}