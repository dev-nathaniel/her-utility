import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { JSX, useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import useAppState from '@/hooks/useAppState';
import useOnlineManager from '@/hooks/useOnlineManager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { focusManager, QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider, removeOldestQuery } from '@tanstack/react-query-persist-client';
import { AppStateStatus, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';


/* -------------------------
   Toast: modern custom config
   ------------------------- */
      // design toast

const toastConfig: Record<string, (props: any) => JSX.Element> = {
  success: ({ text1, text2, props, onPress }: any) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
        if (onPress) onPress();
        Toast.hide();
      }}
      style={[styles.container, styles.success]}
    >
      <View style={styles.iconWrapper}>
        <FontAwesome name="check" size={18} color="#fff" />
      </View>
      <View style={styles.textWrapper}>
        {text1 ? <Text style={styles.title}>{text1}</Text> : null}
        {text2 ? <Text style={styles.message}>{text2}</Text> : null}
      </View>
    </TouchableOpacity>
  ),

  error: ({ text1, text2, props, onPress }: any) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
        if (onPress) onPress();
        Toast.hide();
      }}
      style={[styles.container, styles.error]}
    >
      <View style={styles.iconWrapper}>
        <FontAwesome name="exclamation" size={18} color="#fff" />
      </View>
      <View style={styles.textWrapper}>
        {text1 ? <Text style={styles.title}>{text1}</Text> : null}
        {text2 ? <Text style={styles.message}>{text2}</Text> : null}
      </View>
    </TouchableOpacity>
  ),

  info: ({ text1, text2, props, onPress }: any) => (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={() => {
        if (onPress) onPress();
        Toast.hide();
      }}
      style={[styles.container, styles.info]}
    >
      <View style={styles.iconWrapper}>
        <FontAwesome name="info" size={18} color="#fff" />
      </View>
      <View style={styles.textWrapper}>
        {text1 ? <Text style={styles.title}>{text1}</Text> : null}
        {text2 ? <Text style={styles.message}>{text2}</Text> : null}
      </View>
    </TouchableOpacity>
  ),

  // Fallback default toast - minimal
  default: ({ text1, text2, onPress }: any) => (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={() => {
        if (onPress) onPress();
        Toast.hide();
      }}
      style={[styles.container, styles.default]}
    >
      <View style={styles.textWrapper}>
        {text1 ? <Text style={styles.title}>{text1}</Text> : null}
        {text2 ? <Text style={styles.message}>{text2}</Text> : null}
      </View>
    </TouchableOpacity>
  ),
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 48,
    padding: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 6,
    backgroundColor: '#222', // overwritten by variant
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrapper: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
    marginBottom: 2,
  },
  message: {
    color: '#eef',
    fontSize: 12,
    opacity: 0.9,
  },
  success: {
    backgroundColor: '#0f9d58',
  },
  error: {
    backgroundColor: '#d32f2f',
  },
  info: {
    backgroundColor: '#1976d2',
  },
  default: {
    backgroundColor: '#333',
  },
});

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active')
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      gcTime: 1000 * 60 * 60 * 24,
      staleTime: 1000 * 60 * 5
    }
  }
})

const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
  retry: removeOldestQuery
})

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  
  useOnlineManager()

  useAppState(onAppStateChange)
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }


  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister: asyncStoragePersister }}>
      <PaperProvider>
      <GestureHandlerRootView>
        <RootLayoutNav />
      </GestureHandlerRootView>
      </PaperProvider>
      <Toast />
    </PersistQueryClientProvider>

  )
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack >
        <Stack.Screen name='index' options={{ headerShown: false }} />
        {/* <Stack.Screen name='(onboarding)' options={{ headerShown: false }} /> */}
        <Stack.Screen name='(auth)' options={{ headerShown: false }} />
        <Stack.Screen name='(registerBusiness)' options={{ headerShown: false }} />
        <Stack.Screen name='(businesses)' options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(quoteForm)" options={{ headerShown: false }} />
        <Stack.Screen name="utility" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}
