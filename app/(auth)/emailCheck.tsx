import EmailIcon from '@/assets/icons/EmailIcon'
import CustomInput from '@/components/CustomInput'
import Colors from '@/constants/Colors'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, router } from 'expo-router'
import React from 'react'
import { useForm } from 'react-hook-form'
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as yup from "yup"


const emailCheckSchema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
}).required()

type LoginForm = yup.InferType<typeof emailCheckSchema>

export default function EmailCheck() {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
        resolver: yupResolver(emailCheckSchema)
    })
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.white }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 16 }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{ marginTop: 40 }}>
                        <Text style={{ fontWeight: 'semibold', fontSize: 41, lineHeight: 48, marginBottom: 6 }}>Create Account</Text>
                        <Text style={{ fontSize: 22, color: '#6B6B6B' }}>Enter your email address</Text>
                    </View>

                    <View style={{ gap: 24, marginTop: 40, marginBottom: 180 }}>
                        <CustomInput register={register("email")} icon={<EmailIcon />} placeholder='example@email.com' title='Email Address' />
                    </View>

                    <View>
                        <Link href="/(auth)/register" asChild>
                            <TouchableOpacity >
                                <View style={{ backgroundColor: Colors.light.tint, borderRadius: 70, paddingVertical: 18, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontWeight: '600', fontSize: 24, color: Colors.light.white }}>Next</Text>
                                </View>
                            </TouchableOpacity>
                        </Link>
                    </View>



                    <Text onPress={() => router.back()} style={{ color: Colors.light.tint, textAlign: 'center', fontSize: 24, fontWeight: 'semibold', marginTop: 16 }}>Back</Text>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}