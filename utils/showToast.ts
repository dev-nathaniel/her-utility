import Toast from 'react-native-toast-message'

export type ToastType = 'success' | 'error' | 'info' | 'custom'

export interface ShowToastOptions {
    type?: ToastType
  text1?: string
  text2?: string
  position?: 'top' | 'bottom'
  visibilityTime?: number
  autoHide?: boolean
  onPress?: () => void
  props?: Record<string, any>
}

export default function showToast(options: ShowToastOptions = {}) {
   const {
    type = 'success',
    text1 = '',
    text2,
    position = 'top',
    visibilityTime = 4000,
    autoHide = true,
    onPress,
    props,
  } = options

  Toast.show({
    type,
    text1,
    text2,
    position,
    visibilityTime,
    autoHide,
    onPress,
    props,
  })
}