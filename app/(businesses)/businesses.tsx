import ArrowUpRight from '@/assets/icons/ArrowUpRight';
import useUser from '@/hooks/useUser';
import { fetchBusinesses } from '@/lib/api';
import { Feather } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- Color Palette (From previous screens) ---
const COLORS = {
  primary: '#5A55E8', // Vibrant purple-blue from buttons
  background: '#F9F9F9', // Light grey page background
  white: '#FFFFFF',
  black: '#000000',
  textGrey: '#6f6f6f', // Subtitle grey
  lightGrey: '#F0F0F0', // Border color
  inputBorder: '#E0E0E0', // Light border for inputs
  primaryLightBG: 'rgba(90, 85, 232, 0.05)', // Dashed button BG
  primaryLighterBG: 'rgba(90, 85, 232, 0.1)', // Icon BG / Pill BG
  segmentGrey: '#EFEFF4',
};

// --- Type Definitions ---
export interface Business {
  _id: string;
  name: string;
  address: number;
  createdAt: string;
  invites: any[];
  members: any[];
  updatedAt: string;
  utilities: any[];
  sites: any[];
}

// --- Mock Data ---
// const BUSINESSES_DATA: Business[] = [
//   {
//     id: '1',
//     name: 'BIOS ltd',
//     siteCount: 3,
//     memberCount: 8,
//     initials: 'BL',
//   },
//   {
//     id: '2',
//     name: 'A. Olowo Properties',
//     siteCount: 1,
//     memberCount: 2,
//     initials: 'AO',
//   },
// ];

// --- Reusable Components ---

/**
 * A card representing a single Business
 * Based on 'iPhone 16 Pro - 17.png'
 */
const BusinessCard: React.FC<{ business: Business }> = ({ business }) => {
  const router = useRouter();

  const onManage = () => {
    // Navigate to the Business Details screen
    // Using a placeholder path
    // router.push(`/(app)/businesses/${business.id}`);
    router.push({pathname: '/(businesses)/business', params: { businessId: business._id }})
  };

  const onAddSite = () => {
    // Navigate directly to the add site form for this business
    router.push(`/(businesses)/addSite`);
    // router.push(`/(app)/businesses/${business.id}/add-site`);
  };

  const onInvite = () => {
    // Navigate to the invite member form for this business
    router.push(`/(businesses)/inviteMember`);
    // router.push(`/(app)/businesses/${business.id}/invite-member`);
  };

  return (
    <Link asChild href={{pathname: '/(businesses)/business', params: { businessId: business._id}}} >
    <TouchableOpacity>
    <View style={styles.cardContainer}>
      {/* Card Header */}
      <View style={styles.cardHeader}>
        <LinearGradient colors={['#3B50DF', '#7685FF']} style={styles.cardAvatar}>
          <Text style={styles.cardAvatarText}>
            {/* {business.initials} */}
            {business?.name?.split(" ")?.[0]?.charAt(0)}{business?.name?.split(" ")?.[1]?.charAt(0)}
            </Text>
        </LinearGradient>
        <View style={styles.cardTitleContainer}>
          <Text style={styles.cardTitle}>{business.name}</Text>
          <Text style={styles.cardSubtitle}>
            {business?.sites?.length} Sites • {business?.members?.length} Members
          </Text>
        </View>
        <TouchableOpacity style={styles.cardArrowButton} onPress={onManage}>
          {/* <Ionicons name="arrow-forward-circle" size={20} color={COLORS.primary} /> */}
            <ArrowUpRight type='secondary' />
        </TouchableOpacity>
      </View>

      {/* Action Buttons */}
      <View style={styles.cardButtonContainer}>
        <TouchableOpacity style={styles.cardButton} onPress={onAddSite}>
          <Feather name="plus" size={16} color={COLORS.black} />
          {/* <PlusIcon width={16} height={16} /> */}
          <Text style={styles.cardButtonText}>Add Site</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.cardButton} onPress={onInvite}>
          <Feather name="user-plus" size={16} color={COLORS.black} />
          <Text style={styles.cardButtonText}>Invite Member</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cardButton} onPress={onManage}>
          <Feather name="settings" size={16} color={COLORS.black} />
          <Text style={[styles.cardButtonText]}>Manage</Text>
        </TouchableOpacity>
      </View>
    </View>
    </TouchableOpacity>
    </Link>
  );
};

/**
 * The dashed "Add New" button
 * Based on 'iPhone 16 Pro - 17.png'
 */
const AddNewBusinessButton: React.FC<{ onPress: () => void }> = ({ onPress }) => (
  <TouchableOpacity style={styles.addNewButton} onPress={onPress} activeOpacity={0.7}>
    <Feather name="plus" size={20} color={COLORS.primary} />
    <Text style={styles.addNewButtonText}>Add New Business</Text>
  </TouchableOpacity>
);

/**
 * Search Bar component
 * Based on 'iPhone 16 Pro - 17.png'
 */
const SearchBar: React.FC<{ state: string, setState: React.Dispatch<React.SetStateAction<string>>}> = ({ state, setState}) => {
  return (
    <View style={styles.searchContainer}>
      {/* <View style={styles.searchInputWrapper}> */}
        <Feather name="search" size={20} color={COLORS.textGrey} style={styles.searchIcon} />
        <TextInput value={state} onChangeText={setState} placeholder='Search businesses' style={styles.searchText} />
      {/* </View> */}
    </View>
  );
};


// --- Main Screen Component ---

export default function YourBusinessesScreen() {
  const router = useRouter();
  const {userId} = useUser()
  const [search, setSearch] = useState<string>("")

  const { data: businesses, isLoading: isBusinessesLoading, isError: isBusinessesError, error: businessesError, refetch: refetchBusinesses } = useQuery({
    queryKey: ['businesses', userId],
    queryFn: fetchBusinesses,
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  })

  console.log(businesses, 'businesses')
  console.log((businessesError as any)?.response, 'business error')

  if (isBusinessesLoading) return null

  const filtered = businesses?.businesses?.filter((item: Business) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={{fontSize: 24, fontWeight: '600'}}>Your businesses</Text>
        <Text style={styles.pageSubtitle}>
          Manage your organisations and sites in one place
        </Text>

        <SearchBar state={search} setState={setSearch} />

        {/* Business Cards List */}
        {businesses && businesses.businesses && businesses.businesses.length > 0 && filtered && filtered.length > 0 && filtered.map((business: Business) => (
          <BusinessCard key={business._id} business={business} />
        ))}

        {/* Add New Business Button */}
        <AddNewBusinessButton onPress={() => { router.push('/(registerBusiness)/businessReg') }} />

      </ScrollView>
    </SafeAreaView>
  );
}

// --- Styles ---

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.background,
    shadowOpacity: 0,
    elevation: 0,
    borderBottomWidth: 0,
  },
  headerIcon: {
    padding: 4,
    marginHorizontal: Platform.OS === 'ios' ? 8 : 16,
  },
  headerTitleStyle: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.black,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  pageSubtitle: {
    fontSize: 16,
    color: COLORS.textGrey,
    marginBottom: 16,
    // paddingHorizontal: 8,
    marginTop: 4,
  },
  // Search Bar
  searchContainer: {
    marginVertical: 16,
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F3FF',
    borderRadius: 24,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.segmentGrey,
    borderRadius: 14,
    height: 48,
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 16,
  },
  searchText: {
    fontSize: 16,
    // color: COLORS.textGrey,
    flex: 1,
  },
  // Business Card
  cardContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    borderColor: '#000',
    borderWidth: 1,
    // ...Platform.select({
    //   ios: {
    //     shadowColor: '#000',
    //     shadowOffset: { width: 0, height: 2 },
    //     shadowOpacity: 0.05,
    //     shadowRadius: 4,
    //   },
    //   android: {
    //     elevation: 3,
    //   },
    // }),
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderBottomWidth: 1,
    // borderBottomColor: COLORS.lightGrey,
    // paddingBottom: 16,
    gap: 12
  },
  cardAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    // backgroundColor: COLORS.primaryLighterBG,
    justifyContent: 'center',
    alignItems: 'center',
    // marginRight: 12,
  },
  cardAvatarText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.white,
  },
  cardTitleContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.black,
  },
  cardSubtitle: {
    fontSize: 14,
    color: COLORS.textGrey,
    marginTop: 4,
  },
  cardArrowButton: {
    // marginLeft: 12,
    padding: 8,
    backgroundColor: '#EDEEFF',
    borderRadius: 20,
  },
  // Card Buttons
  cardButtonContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-around',
    // paddingTop: 16,
    gap: 12,
    flex: 1,
    flexWrap: 'wrap',
    marginTop: 16,
  },
  cardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 18,
    gap: 8,
    // flex: 1,
    paddingVertical: 7,
  },
  cardButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.primary,
    // marginLeft: 6,
  },
  cardButtonTextGrey: {
    color: COLORS.textGrey,
  },
  // Add New Button
  addNewButton: {
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 16,
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primaryLightBG,
    flexDirection: 'row',
    marginTop: 8,
  },
  addNewButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
    marginLeft: 8,
  },
});