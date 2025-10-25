import Colors from '@/constants/Colors'
import React from 'react'
import { Text, View } from 'react-native'

type BillProps = {
    icon: React.ReactNode
    bill: string
    details: string
    amount: number
    dueDate: string
    color: string
}

const Bill = ({icon, bill, details, amount, dueDate, color}: BillProps) => {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, borderRadius: 20, backgroundColor: '#fff'}}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
        <View style={{justifyContent: 'center', alignItems: 'center', borderRadius: 50, padding: 8, backgroundColor: color}}>
            {icon}
        </View>

        <View style={{gap: 4}}>
            <Text style={{fontWeight: '400', fontSize: 18}}>{bill}</Text>
            <Text style={{fontWeight: '400', fontSize: 12, color: '#6B6B6B'}}>{details}</Text>
        </View>
      </View>

      <View style={{alignItems: 'flex-end', gap: 4}}>
        <Text style={{fontWeight: '400', fontSize: 16}}>£{amount}</Text>
        <Text style={{fontWeight: '400', fontSize: 11, lineHeight: 16, textDecorationLine: 'underline', color: Colors.light.red, textAlign: 'center'}}>{dueDate}</Text>
      </View>
    </View>
  )
}

export default Bill