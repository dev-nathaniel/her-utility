import Colors from '@/constants/Colors'
import { Link } from 'expo-router'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function EmailCheck1() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.white }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16, paddingHorizontal: 16 }}>
                <Image source={require('@/assets/images/lightbulb.png')} />

                <Text style={{ fontSize: 32, textAlign: 'center' }}>Looks like you already have an account</Text>
                <Text style={{ color: '#4F4F4F', fontSize: 16, textAlign: 'center' }}>An account already exists under this email address</Text>
            </View>
            <View style={{ width: '100%', paddingHorizontal: 16, gap: 16 }}>
                <Link href="/(auth)/login" replace asChild>
                    <TouchableOpacity>
                        <View style={{ backgroundColor: Colors.light.tint, borderRadius: 70, paddingVertical: 18, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontWeight: '600', fontSize: 24, color: Colors.light.white }}>Go to Log In</Text>
                        </View>
                    </TouchableOpacity>
                </Link>
            </View>

        </SafeAreaView>
    )
}