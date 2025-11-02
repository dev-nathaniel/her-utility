import Colors from '@/constants/Colors';
import React from 'react';
import { Text, TextInput, View } from 'react-native';

export type CustomInputType = {
    title: string;
    icon: React.ReactNode;
    placeholder: string;
    register: any;
}

export default function CustomInput({title, icon, placeholder, register}: CustomInputType) {
  return (
    <View style={{gap: 6}}>
      <Text style={{color: Colors.light.tint, fontSize: 18, lineHeight: 22, fontWeight: 'medium'}}>{title}</Text>
      <View style={{borderColor: '#D9D9D9', borderWidth: 1.5, borderRadius: 18, paddingHorizontal: 16, paddingVertical: 24, gap: 16, flexDirection: 'row', alignItems: 'center'}}>
        {icon}
        <TextInput {...register} placeholder={placeholder} placeholderTextColor={'#A0A0A0'} style={{ lineHeight: 22, fontSize: 22}} />
      </View>
    </View>
  )
}