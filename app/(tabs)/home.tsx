import ElectricHomeIcon from '@/assets/icons/ElectricHomeIcon';
import GasPipeIcon from '@/assets/icons/GasPipeIcon';
import NotificationIcon from '@/assets/icons/NotificationIcon';
import PlusIcon from '@/assets/icons/PlusIcon';
import EmptyUitilityWidget from '@/components/EmptyUitilityWidget';
import LocationWidget from '@/components/LocationWidget';
import UtilityWidget from '@/components/UtilityWidget';
import Colors from '@/constants/Colors';
import useUser from '@/hooks/useUser';
import { fetchSiteDetails, fetchSites, fetchUser } from '@/lib/api';
import showToast from '@/utils/showToast';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useQuery } from '@tanstack/react-query';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MemberType } from '../(businesses)/business';
import { Business } from '../(businesses)/businesses';

export type siteType = {
 _id: string, 
 address: string, 
 business: Business, 
 createdAt: string, 
 members: MemberType[], 
 name: string, 
 updatedAt: string, 
 utilities: any[]
}

//add notification/banner incase they have not filled in a business (sample case: Leave the app after register and don't complete business reg)

export default function TabOneScreen() {
  const {userId} = useUser()
  // Fetch list of sites/locations available for this user
  // - keyed by ['sites', userId] so cache is per-user
  const { data: sites, isLoading: isSitesLoading, isError: isSitesError, error: sitesError, refetch: refetchSites } = useQuery({
    queryKey: ['sites', userId],
    queryFn: fetchSites,
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  })
  //state
  const [location, setLocation] = useState<siteType | undefined>();
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);
console.log(location, 'location')

useEffect(() => {
  if (!location && sites?.sites && sites.sites.length > 0) {
    setLocation(sites.sites[0])
  }
}, [sites, location])

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleOpenLocationSheet = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  const handleLocationSelect = useCallback((location: siteType) => {
    console.log('Selected location:', location);
    setLocation(location);
    bottomSheetRef.current?.close();
  }, []);
//fetch user details
//fetch site details based on location state
//fetch different sites
  const {isLoading, error, data: user, isError, refetch} = useQuery({
    queryFn: () => fetchUser(userId as string),
    queryKey: ['user', userId],
    enabled: !!userId,
    staleTime: 1000 * 60 * 5
  })

  

  // Fetch details for the currently selected location
  // - keyed by ['site', location] so switching location refetches detail
  // - enabled only when we have a location and the sites list (so we can map location -> id if needed)
  const { data: siteDetails, isLoading: isSiteLoading, isError: isSiteError, error: siteError, refetch: refetchSite } = useQuery<{site: siteType}>({
    queryKey: ['site', location?._id],
    queryFn: () => {
      // If your API expects a site id, map location -> site id using `sites`.
      // Otherwise pass the location string directly.
      // const site = sites?.find((s: any) => s.location === location)
      const arg = location?._id as string
      return fetchSiteDetails(arg)
    },
    enabled: !!location?._id,
    staleTime: 1000 * 60 * 5,
  })
// 
  console.log(sites, 'sites')
  console.log(siteDetails, 'siteDetails')

  const addUtility = () => {
    if (user?.user.businesses.length < 1) {
      showToast({type: 'error', text1: 'No Business to add utility to', text2: 'Please register your business details.'})
    } else {
      router.push('/(quoteForm)/getQuote1')
    }
  }
  return (
    <>
      <SafeAreaView style={{ flex: 1, paddingHorizontal: 16, backgroundColor: '#EDEEF0' }} edges={['top', 'left', 'right']}>
        <StatusBar style='dark' />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 }}>
            <View style={{ width: 48, height: 48, borderRadius: 50, backgroundColor: Colors.light.black }}>
              <Image source={require('@/assets/images/pp.png')} />
            </View>
            <Text style={{ fontWeight: '400', fontSize: 24, flex: 1 }} numberOfLines={1}>Hello, {user?.user.fullname.split(" ")[0]}</Text>
          </View>

          <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#D9D9D9', padding: 12, borderRadius: 50 }}>
            <NotificationIcon type='secondary' />
          </View>
        </View>

        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {user?.user.businesses.length < 1 ? 
          <Link asChild href={'/(registerBusiness)/businessReg'}>
          <TouchableOpacity>
          <View style={{ backgroundColor: Colors.light.tint, padding: 12, borderRadius: 12, marginBottom: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flex: 1, paddingRight: 8 }}>
              <Text style={{ color: Colors.light.white, fontWeight: '600', fontSize: 16 }}>Complete your business details</Text>
              <Text style={{ color: Colors.light.white, opacity: 0.9, marginTop: 4 }}>You haven't added business information yet. Add it now to manage utilities.</Text>
            </View>
          </View>
          </TouchableOpacity>
          </Link>
           : null}
          {sites?.sites.length > 0 && location ? <LocationWidget location={location} onPress={handleOpenLocationSheet} /> : null}

          <View style={{ marginTop: 16, flexDirection: 'row', gap: 10, flexWrap: 'wrap' }}>
            {siteDetails && siteDetails.site && siteDetails.site.utilities && siteDetails.site.utilities.length > 0 ? 
            <><Link asChild href='/utility'>
              <TouchableOpacity>

                <UtilityWidget utility='Gas' icon={<GasPipeIcon type='custom' color={Colors.light.white} />} />
              </TouchableOpacity>
            </Link>
            <Link asChild href='/utility'>
              <TouchableOpacity>

                <UtilityWidget utility='Electricity' icon={<ElectricHomeIcon type='custom' color={Colors.light.white} />} />
              </TouchableOpacity>
            </Link>
            </> 
             : null} 
             
            {/* if no business either toast or navigate to create business first */}
            {/* <Link asChild href='/(quoteForm)/getQuote1'> */}
              <TouchableOpacity onPress={addUtility}>
                <EmptyUitilityWidget />
              </TouchableOpacity>
            {/* </Link> */}
          </View>

          <View style={{ marginVertical: 24, gap: 24 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontWeight: '200', fontSize: 32, lineHeight: 36, maxWidth: 250 }}>Your <Text style={{ fontWeight: 'semibold' }}>bills</Text> expiring soon</Text>
              <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.light.tint, paddingVertical: 6, paddingHorizontal: 16, borderRadius: 50 }}>
                <Text style={{ fontWeight: '400', fontSize: 32, color: Colors.light.white }}>0</Text>
              </View>
            </View>
              {/* Bills for every Organisation */}
            {/* <View style={{ gap: 14 }}>
              <Bill amount={200} bill='Electricity' details='MPAN: 12345678910' dueDate='3 days' color='#C83C9220' icon={<ElectricHomeIcon type='custom' color={Colors.light.pink} />} />
              <Bill amount={200} bill='Gas' details='MPRN: 12345678910' dueDate='3 days' color='#00D44420' icon={<GasPipeIcon type='custom' color={'#00D444'} />} />
            </View> */}
          </View>
        </ScrollView>

      </SafeAreaView>
      <BottomSheet enableContentPanningGesture style={{ paddingHorizontal: 24, }} index={-1} enableDynamicSizing={false} enablePanDownToClose snapPoints={['40%', '80%']} ref={bottomSheetRef} onChange={handleSheetChanges} >
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 16 }}>Select a location</Text>
        </View>
        <BottomSheetFlatList<{ id: string; location: string }>
          style={{ marginTop: 20, flex: 1 }}
          contentContainerStyle={{ paddingBottom: 20 }} // don't use flex or gap here
          nestedScrollEnabled={true}
          data={sites?.sites ?? []}
          keyExtractor={(item: siteType) => item._id}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          renderItem={({ item, index }: { item: siteType, index: number }) => {
            return(
              <>
              {index === sites?.sites.length - 1 ?
              <>
            <TouchableOpacity onPress={() => handleLocationSelect(item)} style={{ padding: 16, paddingVertical: 20, borderRadius: 20, backgroundColor: '#EDEEF0', flexDirection: 'row', gap: 16, borderWidth: item === location ? 2 : 0, borderColor: Colors.light.tint, alignItems: 'center' }}>
              <View style={{ width: 20, height: 20, borderWidth: item === location ? 4 : 2, borderColor: Colors.light.tint, borderRadius: 20, backgroundColor: item === location ? '#fff' : undefined }}></View>
              <View>
              <Text style={{ fontSize: 16, fontWeight: '400' }}>{item.name}</Text>
              <Text style={{ fontSize: 12, fontWeight: '400', color: '#707070' }}>Business: {item.business.name}</Text>
              </View>

            </TouchableOpacity>
            <TouchableOpacity onPress={()=>router.push('/(businesses)/addSite')} style={{ padding: 16, paddingVertical: 20, borderRadius: 20, backgroundColor: '#EDEEF0', flexDirection: 'row', gap: 16, borderWidth: 2 , borderStyle: 'dashed', borderColor: Colors.light.tint, alignItems: 'center', marginTop: 20 }}>
              {/* <View style={{ width: 20, height: 20, borderWidth: item === location ? 4 : 2, borderColor: Colors.light.tint, borderRadius: 20, backgroundColor: item === location ? '#fff' : undefined }}></View> */}
              <PlusIcon />
              <Text style={{ fontSize: 16, fontWeight: '400' }}>Add new site</Text>
            </TouchableOpacity>
            </>
            :
            <TouchableOpacity onPress={() => handleLocationSelect(item)} style={{ padding: 16, paddingVertical: 20, borderRadius: 20, backgroundColor: '#EDEEF0', flexDirection: 'row', gap: 16, borderWidth: item === location ? 2 : 0, borderColor: Colors.light.tint, alignItems: 'center' }}>
              <View style={{ width: 20, height: 20, borderWidth: item === location ? 4 : 2, borderColor: Colors.light.tint, borderRadius: 20, backgroundColor: item === location ? '#fff' : undefined }}></View>
              <View>
              <Text style={{ fontSize: 16, fontWeight: '400' }}>{item.name}</Text>
              <Text style={{ fontSize: 12, fontWeight: '400', color: '#707070' }}>Business: {item.business.name}</Text>
              </View>
            </TouchableOpacity>}
            </>
          )}}
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
