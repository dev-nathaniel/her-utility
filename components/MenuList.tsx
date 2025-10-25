import Colors from '@/constants/Colors';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type MenuListProps = {
  items: Array<{
    title: string;
    onPress: () => void;
    icon?: React.ReactNode;
  }>;
  title: string;
}

const MenuList = ({ items, title }: MenuListProps) => {
  return (
    <View style={{gap: 24}}>
      <Text style={{fontSize: 24, lineHeight: 22}}>{title}</Text>
      <View style={{backgroundColor: Colors.light.white, borderRadius: 20, paddingHorizontal: 16}}>
        {items.map((item, index) => (
          <TouchableOpacity key={index} onPress={item.onPress}>
          <View style={{ paddingVertical: 16, borderBottomWidth: index !== items.length - 1 ? 1 : 0, borderBottomColor: '#00000030', flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            {item.icon}
            <Text style={{ fontSize: 20, fontWeight: '400'}}>{item.title}</Text>
          </View>
          </TouchableOpacity>
        ))}
      </View>

    </View>
  )
}

export default MenuList