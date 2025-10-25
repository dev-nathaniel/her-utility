import ElectricHomeIcon from '@/assets/icons/ElectricHomeIcon';
import GasPipeIcon from '@/assets/icons/GasPipeIcon';
import NotificationIcon from '@/assets/icons/NotificationIcon';
import Bill from '@/components/Bill';
import EmptyUitilityWidget from '@/components/EmptyUitilityWidget';
import LocationWidget from '@/components/LocationWidget';
import UtilityWidget from '@/components/UtilityWidget';
import Colors from '@/constants/Colors';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useRef, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function TabOneScreen() {
  //state
  const [location, setLocation] = useState('London Office');
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleOpenLocationSheet = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  const handleLocationSelect = useCallback((location: string) => {
    console.log('Selected location:', location);
    setLocation(location);
    bottomSheetRef.current?.close();
  }, []);
  return (
    <>
      <SafeAreaView style={{ flex: 1, paddingHorizontal: 16, backgroundColor: '#EDEEF0' }} edges={['top', 'left', 'right']}>
        <StatusBar style='dark' />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <View style={{ width: 48, height: 48, borderRadius: 50, backgroundColor: Colors.light.black }}>
              <Image source={require('@/assets/images/pp.png')} />
            </View>
            <Text style={{ fontWeight: '400', fontSize: 24 }}>Hello, Nim</Text>
          </View>

          <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#D9D9D9', padding: 12, borderRadius: 50 }}>
            <NotificationIcon type='secondary' />
          </View>
        </View>

        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <LocationWidget location={location} onPress={handleOpenLocationSheet} />

          <View style={{ marginTop: 16, flexDirection: 'row', gap: 10, flexWrap: 'wrap' }}>
            <Link asChild href='/utility'>
              <TouchableOpacity>

                <UtilityWidget utility='Gas' icon={<GasPipeIcon type='custom' color={Colors.light.white} />} />
              </TouchableOpacity>
            </Link>
            <Link asChild href='/utility'>
              <TouchableOpacity>

                <UtilityWidget utility='Electricity' icon={<ElectricHomeIcon type='custom' color={Colors.light.white} />} />
              </TouchableOpacity>
            </Link>
            <Link asChild href='/(quoteForm)/getQuote1'>
            <TouchableOpacity>
            <EmptyUitilityWidget />
            </TouchableOpacity>
            </Link>
          </View>

          <View style={{ marginVertical: 24, gap: 24 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontWeight: '200', fontSize: 32, lineHeight: 36, maxWidth: 250 }}>Your <Text style={{ fontWeight: 'semibold' }}>bills</Text> expiring soon</Text>
              <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.light.tint, paddingVertical: 6, paddingHorizontal: 16, borderRadius: 50 }}>
                <Text style={{ fontWeight: '400', fontSize: 32, color: Colors.light.white }}>2</Text>
              </View>
            </View>

            <View style={{ gap: 14 }}>
              <Bill amount={200} bill='Electricity' details='MPAN: 12345678910' dueDate='3 days' color='#C83C9220' icon={<ElectricHomeIcon type='custom' color={Colors.light.pink} />} />
              <Bill amount={200} bill='Gas' details='MPRN: 12345678910' dueDate='3 days' color='#00D44420' icon={<GasPipeIcon type='custom' color={'#00D444'} />} />
            </View>
          </View>
        </ScrollView>

      </SafeAreaView>
      <BottomSheet enableContentPanningGesture style={{ paddingHorizontal: 24, }} index={-1} enableDynamicSizing={false} enablePanDownToClose snapPoints={['40%', '80%']} ref={bottomSheetRef} onChange={handleSheetChanges} >
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 16 }}>Select a location</Text>
        </View>
        <BottomSheetFlatList
          style={{ marginTop: 20, flex: 1 }}
          contentContainerStyle={{ paddingBottom: 20 }} // don't use flex or gap here
          nestedScrollEnabled={true}
          data={[{ id: '1', location: 'London Office' }, { id: '2', location: 'New York Office' }, { id: '3', location: 'San Francisco Office' }, { id: '4', location: 'Berlin Office' }, { id: '5', location: 'Tokyo Office' }, { id: '6', location: 'Sydney Office' }, { id: '7', location: 'Toronto Office' }, { id: '8', location: 'Paris Office' }, { id: '9', location: 'Dubai Office' }]}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={()=>handleLocationSelect(item.location)} style={{ padding: 16, paddingVertical: 20, borderRadius: 20, backgroundColor: '#EDEEF0', flexDirection: 'row', gap: 16, borderWidth: item.location === location ? 2 : 0, borderColor: Colors.light.tint, alignItems: 'center' }}>
              <View style={{ width: 20, height: 20, borderWidth: item.location === location ? 4 : 2, borderColor: Colors.light.tint, borderRadius: 20, backgroundColor: item.location === location ? '#fff' : null }}></View>
              <Text style={{ fontSize: 16, fontWeight: '400' }}>{item.location}</Text>
            </TouchableOpacity>
          )}
        />

      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
