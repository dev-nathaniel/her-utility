import LockIcon from '@/assets/icons/LockIcon'
import MailBoxIcon from '@/assets/icons/MailBoxIcon'
import CustomInput from '@/components/CustomInput'
import Colors from '@/constants/Colors'
import { login } from '@/lib/api'
import showToast from '@/utils/showToast'
import { yupResolver } from '@hookform/resolvers/yup'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useMutation } from '@tanstack/react-query'
// import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import React from 'react'
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as yup from "yup"

const loginSchema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, "At least 6 characters").required("Password is required")
}).required()

type LoginForm = yup.InferType<typeof loginSchema>

export default function Login() {
    const { register, handleSubmit, control, watch, formState: { errors } } = useForm<LoginForm>({
        resolver: yupResolver(loginSchema)
    })

    const router = useRouter()

    const { mutate, data, error, isSuccess, isPending, isError } = useMutation({
        mutationFn: login,
        onSuccess: async (data) => {
            console.log("Logged in successfully")
            await AsyncStorage.setItem('token', data.token)
            await AsyncStorage.setItem('refreshToken', data.refreshToken)
            showToast({text1: "Successfully Logged In."})
            router.replace({pathname: '/(tabs)/home'})
            //invalidate user queries
        },
        onError: (error) => {
            showToast({type: "error", text1: "Something went wrong.", text2: "Please try again."})
            console.log("something went wrong")
            console.log(error)
            console.log((error as any)?.response.status)
        }
    })

    const onSubmit: SubmitHandler<LoginForm> = (formData) => {
        // console.log(formData)
        mutate(formData)
        // console.log("checking")
    }

    // console.log(errors)

    // console.log(watch("email"))

    // if (isError) {
    //     console.log(error)
    // }

    // if (isPending) {
    //     console.log("Logging in")
    // }

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
                        <Text style={{ fontWeight: 'semibold', fontSize: 41, lineHeight: 48, marginBottom: 6 }}>Welcome Back</Text>
                        <Text style={{ fontSize: 22, color: '#6B6B6B' }}>Log in to manage your utilities</Text>
                    </View>

                    <View style={{ gap: 24, marginTop: 40 }}>
                        <Controller control={control} name='email' render={({ field: { onChange, onBlur, value } }) => (
                            <CustomInput error={errors.email} {...register("email")} value={value} onChangeText={onChange} icon={<MailBoxIcon />} placeholder='example@email.com' title='Email Address' />
                        )}>
                        </Controller>
                        <Controller control={control} name='password' render={({ field: { onChange, onBlur, value } }) => (
                            <CustomInput error={errors.password} {...register("password")} value={value} onChangeText={onChange} icon={<LockIcon />} placeholder='**********' title='Password' />
                        )}>
                        </Controller>
                    </View>

                    <View style={{ marginTop: 12, marginBottom: 32 }}>
                        <Text style={{ textAlign: 'right', color: Colors.light.tint, fontSize: 18 }}>Forgot Password?</Text>
                    </View>

                    <View>
                        {/* <Link href="/(tabs)/home" asChild> */}
                            <TouchableOpacity onPress={handleSubmit(onSubmit)}>
                                <View style={{ backgroundColor: Colors.light.tint, borderRadius: 70, paddingVertical: 18, justifyContent: 'center', alignItems: 'center' }}>
                                    {isPending ? <ActivityIndicator /> : <Text style={{ fontWeight: '600', fontSize: 24, color: Colors.light.white }}>Login</Text>}
                                </View>
                            </TouchableOpacity>
                        {/* </Link> */}
                    </View>

                    <View style={{ alignItems: 'center', marginVertical: 15 }}>
                    {/* <View style={{ alignItems: 'center', marginVertical: 30 }}> */}
                        {/* <Text style={{ fontSize: 18, color: '#6B6B6B' }}>or continue with</Text> */}
                    </View>

                    <View style={{ gap: 16 }}>
                        {/* <TouchableOpacity>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15, paddingVertical: 15, borderColor: '#000', borderWidth: 1, borderRadius: 70, justifyContent: 'center' }}>
                                <GoogleIcon />
                                <Text style={{ fontSize: 20, fontWeight: 'medium', color: '#00000054' }}>Continue with Google</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15, paddingVertical: 15, backgroundColor: '#000', borderRadius: 70, justifyContent: 'center' }}>
                                <AppleIcon />
                                <Text style={{ fontSize: 20, fontWeight: 'medium', color: '#fff' }}>Continue with Apple</Text>
                            </View>
                        </TouchableOpacity> */}

                        <Text style={{ textAlign: 'center', color: '#6B6B6B', fontSize: 18 }}>Don't have an account? <Text onPress={() => router.push('/(auth)/emailCheck')} style={{ color: Colors.light.tint }}>Sign Up</Text></Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}