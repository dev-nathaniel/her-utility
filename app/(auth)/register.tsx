import LockIcon from '@/assets/icons/LockIcon'
import MailBoxIcon from '@/assets/icons/MailBoxIcon'
import UserIcon from '@/assets/icons/UserIcon'
import CustomInput from '@/components/CustomInput'
import Colors from '@/constants/Colors'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link } from 'expo-router'
import React from 'react'
import { useForm } from 'react-hook-form'
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as yup from "yup"


const registerSchema = yup.object({
  fullname: yup.string().required("Full name is required"),
  postcode: yup.string().required("Postcode is required"),
  address: yup.string().required("Address is required"),
  password: yup.string().min(6, "At least 6 characters").required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm password is required"),
});

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(registerSchema),
  });
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

          <View style={{ gap: 24, marginVertical: 40 }}>
            <CustomInput register={register("fullname")} icon={<UserIcon type='secondary' />} placeholder='John Doe' title='Email Address' />
            <CustomInput register={register("postcode")} icon={<MailBoxIcon />} placeholder='LH1 6FG' title='Postcode' />
            <CustomInput register={register("password")} icon={<LockIcon />} placeholder='**********' title='Password' />
            <CustomInput register={register("confirmPassword")} icon={<LockIcon />} placeholder='**********' title='Confirm Password' />
          </View>

          <View>
            <Link href="/(quoteForm)/getQuote1" asChild>
              <TouchableOpacity >
                <View style={{ backgroundColor: Colors.light.tint, borderRadius: 70, paddingVertical: 18, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontWeight: '600', fontSize: 24, color: Colors.light.white }}>Sign Up</Text>
                </View>
              </TouchableOpacity>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

    </SafeAreaView>
  )
}