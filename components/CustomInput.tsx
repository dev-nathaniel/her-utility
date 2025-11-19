import Colors from '@/constants/Colors';
import React from 'react';
import { Text, TextInput, View } from 'react-native';

export type CustomInputType = {
    title: string;
    icon: React.ReactNode;
    placeholder: string;
    value: string;
    onChangeText: () => void;
    error: any;
}

export default function CustomInput({title, icon, placeholder, value, onChangeText, error, ...props}: CustomInputType) {
  return (
    <View style={{gap: 6}}>
      <Text style={{color: Colors.light.tint, fontSize: 18, lineHeight: 22, fontWeight: 'medium'}}>{title}</Text>
      <View style={{borderColor: '#D9D9D9', borderWidth: 1.5, borderRadius: 18, paddingHorizontal: 16, paddingVertical: 18, gap: 16, flexDirection: 'row', alignItems: 'center'}}>
        {icon}
        <TextInput {...props} value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor={'#A0A0A0'} style={{ fontSize: 22, flex: 1}} />
      </View>
      {error && <Text style={{color: Colors.light.red}}>{error?.message}</Text>}
    </View>
  )
}