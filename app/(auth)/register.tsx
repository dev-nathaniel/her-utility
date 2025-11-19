import LockIcon from '@/assets/icons/LockIcon'
import UserIcon from '@/assets/icons/UserIcon'
import CustomInput from '@/components/CustomInput'
import Colors from '@/constants/Colors'
import { signup } from '@/lib/api'
import showToast from '@/utils/showToast'
import { yupResolver } from '@hookform/resolvers/yup'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useMutation } from '@tanstack/react-query'
import { router } from 'expo-router'
import { useLocalSearchParams } from 'expo-router/build/hooks'
import React from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as yup from "yup"

//make button keyboard avoiding as well


const registerSchema = yup.object({
  fullname: yup.string().required("Full name is required"),
  // postcode: yup.string().required("Postcode is required"),
  // address: yup.string().required("Address is required"),
  password: yup.string().min(6, "At least 6 characters").required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm password is required"),
});

type RegForm = yup.InferType<typeof registerSchema>

export default function Register() {
  const { register, handleSubmit, control, watch, formState: { errors } } = useForm<RegForm>({
    resolver: yupResolver(registerSchema),
  });
  const { email } = useLocalSearchParams()
  const emailParam = typeof email === 'string' ? email : undefined

  const { mutate, data, isError, isSuccess, isPending, error } = useMutation({
    mutationFn: signup,
    onSuccess: async (data) => {
      console.log("registeration successful", data)
      await AsyncStorage.setItem('token', data.token)
      await AsyncStorage.setItem('refreshToken', data.refreshToken)
                  showToast({text1: "Successfully Registered."})
      
      router.push('/(registerBusiness)/businessReg')
    },
    onError: (error) => {
                  showToast({type: "error", text1: "Something went wrong.", text2: "Please try again."})
      
      console.log("something went wrong")
      console.log(error)
    }
  })

  console.log(errors)

  console.log(watch("fullname"))

  const onSubmit: SubmitHandler<RegForm> = (formData) => {
    if (emailParam) {
      mutate({ ...formData, email: emailParam })
    }
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
            <Text style={{ fontSize: 22, color: '#6B6B6B' }}>Let’s get your business setup</Text>
          </View>

          <View style={{ marginVertical: 40, gap: 24 }}>
            <Controller control={control} name='fullname' render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput error={errors.fullname} {...register("fullname")} value={value} onChangeText={onChange} icon={<UserIcon type='secondary' />} placeholder='John Doe' title='Full Name' />
            )}>
            </Controller>
            {/* <Controller control={control} name='postcode' render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput error={errors.postcode} {...register("postcode")} value={value} onChangeText={onChange} icon={<MailBoxIcon />} placeholder='LH1 6FG' title='Postcode' />
            )}>
            </Controller> */}
            <Controller control={control} name='password' render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput error={errors.password} {...register("password")} value={value} onChangeText={onChange} icon={<LockIcon />} placeholder='**********' title='Password' />
            )}>
            </Controller>
            <Controller control={control} name='confirmPassword' render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput error={errors.confirmPassword} {...register("confirmPassword")} value={value} onChangeText={onChange} icon={<LockIcon />} placeholder='**********' title='Confirm Password' />
            )}>
            </Controller>
          </View>

          <View>
            {/* <Link href="/(quoteForm)/getQuote1" asChild> */}
            <TouchableOpacity disabled={isPending} onPress={handleSubmit(onSubmit)} >
              <View style={{ backgroundColor: Colors.light.tint, borderRadius: 70, paddingVertical: 18, justifyContent: 'center', alignItems: 'center' }}>
                {isPending ? <ActivityIndicator /> : <Text style={{ fontWeight: '600', fontSize: 24, color: Colors.light.white }}>Sign Up</Text>}
              </View>
            </TouchableOpacity>
            {/* </Link> */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

    </SafeAreaView>
  )
}