import EmailIcon from '@/assets/icons/EmailIcon'
import CustomInput from '@/components/CustomInput'
import Colors from '@/constants/Colors'
import { checkEmail } from '@/lib/api'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { router } from 'expo-router'
import React, { useRef } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View, } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as yup from "yup"


const emailCheckSchema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
}).required()

type EmailCheckForm = yup.InferType<typeof emailCheckSchema>

export default function EmailCheck() {
    const { register, handleSubmit, control, watch, formState: { errors } } = useForm<EmailCheckForm>({
        resolver: yupResolver(emailCheckSchema)
    })

    const emailRef = useRef<string | null>(null)

    const { mutate, data, isError, isSuccess, isPending, error } = useMutation({
        mutationFn: checkEmail,
        onSuccess: (data) => {
            console.log("email checked", data)
            router.push({pathname: '/(auth)/register', params: { email: emailRef.current ?? '' } })
        },
        onError: (error) => {
            console.log("something went wrong")
            console.log(error)
            if ((error as any)?.response.status == 409) {
                router.push({ pathname: '/(auth)/emailCheck1'})
            }
        }
    })

    console.log(errors)

    console.log(watch("email"))

    const onSubmit: SubmitHandler<EmailCheckForm> = (formData) => {
        emailRef.current = formData.email
        mutate(formData.email)
    }

    if (isError) {
        console.log(error)
    }

    if (isPending) {
        console.log("checking email")
    }


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
                        {/* <TextInput {...register('email')} /> */}
                        <Controller control={control} name='email' render={({ field: { onChange, onBlur, value } }) => (
                            <CustomInput error={errors.email} {...register('email')} value={value} onChangeText={onChange} icon={<EmailIcon />} placeholder='example@email.com' title='Email Address' />
                        )}>
                        </Controller>
                    </View>

                    <View>
                        {/* <Link href="/(auth)/register" asChild> */}
                        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
                            <View style={{ backgroundColor: Colors.light.tint, borderRadius: 70, paddingVertical: 18, justifyContent: 'center', alignItems: 'center' }}>
                                {isPending ? <ActivityIndicator /> : <Text style={{ fontWeight: '600', fontSize: 24, color: Colors.light.white }}>Next</Text>}
                            </View>
                        </TouchableOpacity>
                        {/* </Link> */}
                    </View>



                    <Text onPress={() => router.back()} style={{ color: Colors.light.tint, textAlign: 'center', fontSize: 24, fontWeight: 'semibold', marginTop: 16 }}>Back</Text>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}