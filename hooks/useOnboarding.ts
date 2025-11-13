import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export function useOnboarding() {
    const [seenOnboarding, setSeenOnboarding] = useState<boolean | null>(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        (async() => {
            setLoading(true)
            const res = await AsyncStorage.getItem("onboardingSeen")
            setSeenOnboarding(res === "true")
        })()
        setLoading(false)
    }, [])

    const completeOnboarding = async () => {
        await AsyncStorage.setItem("onboardingSeen", "true")
        setSeenOnboarding(true)
    }

    return { seenOnboarding, completeOnboarding, loading }
}