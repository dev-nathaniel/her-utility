import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export default function useUser() {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
    setLoading(true)
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const decoded = jwtDecode<any>(token);
        setUserId(decoded.userId || decoded.sub || null);
      }
    })();
    setLoading(false)
  }, []);

  return { userId, loading };
}
