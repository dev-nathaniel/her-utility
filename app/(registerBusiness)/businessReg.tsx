// ...existing code...
import MailBoxIcon from '@/assets/icons/MailBoxIcon'
import UserIcon from '@/assets/icons/UserIcon'
import CustomInput from '@/components/CustomInput'
import Colors from '@/constants/Colors'
import useUser from '@/hooks/useUser'
import { createBusiness } from '@/lib/api'; // ensure this exists or implement it
import showToast from '@/utils/showToast'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { router } from 'expo-router'
import React from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as yup from 'yup'

const businessSchema = yup.object({
  name: yup.string().required('Business name is required'),
  address: yup.string().required('Address is required'),
//   postcode: yup.string().optional(),
})

type BusinessForm = yup.InferType<typeof businessSchema>

export default function BusinessReg() {
  const { control, register, handleSubmit, formState: { errors }, watch } = useForm<BusinessForm>({
    resolver: yupResolver(businessSchema),
  })

  const queryClient = useQueryClient()

  const {userId} = useUser()
console.log(userId, 'USER ID')
  const [errorStatus, setErrorStatus] = React.useState<number | string | null>(null)
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)

  const { mutate, isError, isSuccess, isPending, data, error } = useMutation({
    mutationFn: createBusiness,
    onSuccess: (res) => {
      console.log('business created', res)
      showToast({text1: "Business registered successfully"})
    // invalidate cached user and site queries so the UI refreshes
    queryClient.invalidateQueries({ queryKey: ['user'] })
    queryClient.invalidateQueries({ queryKey: ['site'] })
      router.push('/(tabs)/home')  
    },
    onError: (err) => {
                  showToast({type: "error", text1: "Something went wrong.", text2: "Please try again."})
      
      console.log('business create error', err)
      const status = (err as any)?.response?.status ?? (err as any)?.status ?? 'unknown'
      const message = (err as any)?.response?.data?.message ?? (err as any)?.message ?? String(err)
      console.log(message)
      setErrorStatus(status)
      setErrorMessage(message)
    }
  })

  const onSubmit: SubmitHandler<BusinessForm> = (formData) => {
    setErrorStatus(null)
    setErrorMessage(null)
    mutate({...formData, members: userId ? [{userId}] : []})
  }

  console.log(errors)

  console.log(watch("address"))

  if (isError) {
    console.log(error)

    if (isPending) {
        console.log("registering business")
    }
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
            <Text style={{ fontWeight: 'semibold', fontSize: 41, lineHeight: 48, marginBottom: 6 }}>Business Details</Text>
            <Text style={{ fontSize: 22, color: '#6B6B6B' }}>Enter your business information</Text>
          </View>

          <View style={{ marginVertical: 40, }}>
            <Controller control={control} name="name" render={({ field: { onChange, value } }) => (
              <CustomInput
                error={errors.name}
                value={value}
                onChangeText={onChange}
                icon={<UserIcon />}
                placeholder="ACME Ltd"
                title="Business Name"
              />
            )} />
            <Controller control={control} name="address" render={({ field: { onChange, value } }) => (
              <CustomInput
              icon={<MailBoxIcon />}
                error={errors.address}
                value={value}
                onChangeText={onChange}
                placeholder="123 High St, City"
                title="Address"
              />
            )} />
            {/* <Controller control={control} name="postcode" render={({ field: { onChange, value } }) => (
              <CustomInput
                error={errors.postcode}
                value={value}
                onChangeText={onChange}
                placeholder="LH1 6FG"
                title="Postcode (optional)"
              />
            )} /> */}
            {/* {isError && (
              <Text style={{ color: 'red', fontSize: 14 }}>
                {`Error ${errorStatus ?? ''}${errorMessage ? `: ${errorMessage}` : ''}`}
              </Text>
            )} */}
          </View>

          <View>
            <TouchableOpacity onPress={handleSubmit(onSubmit)} disabled={isPending}>
              <View style={{ backgroundColor: Colors.light.tint, borderRadius: 70, paddingVertical: 18, justifyContent: 'center', alignItems: 'center' }}>
                {isPending ? <ActivityIndicator color="#fff" /> : <Text style={{ fontWeight: '600', fontSize: 20, color: Colors.light.white }}>Create Business</Text>}
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}