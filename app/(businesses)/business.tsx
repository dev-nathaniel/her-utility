import useUser from '@/hooks/useUser';
import { fetchBusiness, fetchBusinesses } from '@/lib/api';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { siteType } from '../(tabs)/home';

// --- Color Palette (Sampled from your designs) ---
const COLORS = {
  primary: '#5A55E8', // Vibrant purple-blue from buttons
  background: '#F9F9F9', // Light grey page background
  segmentGrey: '#EFEFF4', // iOS-style segment control background
  white: '#FFFFFF',
  black: '#000000',
  textGrey: '#8A8A8E', // Subtitle grey
  lightGrey: '#F0F0F0', // Border color
  primaryLightBG: 'rgba(90, 85, 232, 0.05)', // Dashed button BG
  primaryLighterBG: 'rgba(90, 85, 232, 0.1)', // Icon BG / Pill BG
};

// --- Mock Data ---
const SITES_DATA = [
  {
    id: '1',
    name: 'Sharmile',
    details: 'Postcode: LE2 0JF',
  },
  {
    id: '2',
    name: 'Leicester Office',
    details: 'MPAN: 1234567890',
  },
];

export interface MemberUserType {
  _id: string;
  email: string;
  fullname: string;
  sites?: siteType[]
  role?: "owner" | "manager" | "viewer";
}

export interface MemberType {
  _id: string;
  role: "owner" | "manager" | "viewer";
  userId: MemberUserType
}

const MEMBERS_DATA = [
  {
    id: '1',
    name: 'Adebayo Olowo',
    initials: 'AO',
    email: 'adebayo@gmail.com',
    role: 'Admin',
    avatar: 'https://placehold.co/100x100/EFEFEF/333?text=AO', // Using placeholder
    pending: false,
  },
  {
    id: '2',
    name: 'Jane Doe',
    initials: 'JD',
    email: 'jane.doe@example.com',
    role: 'Site Manager',
    avatar: 'https://placehold.co/100x100/EFEFEF/333?text=JD',
    pending: false,
  },
  {
    id: '3',
    name: 'invited.user@gmail.com',
    email: 'Pending Invitation',
    role: 'Viewer',
    avatar: null, // No avatar for pending
    pending: true,
  },
];

// --- Reusable Components ---

/**
 * A card representing a single Site.
 * Styled to match the app's card aesthetic.
 */
const SiteCard = ({ site }: {site: siteType}) => (
  <TouchableOpacity onPress={()=>router.push({pathname: '/(businesses)/siteDetails', params: {siteId: site._id}})} style={styles.siteCard} activeOpacity={0.8}>
    <View style={styles.siteCardLeft}>
      <View style={styles.siteIconContainer}>
        <MaterialIcons name="location-pin" size={24} color={COLORS.primary} />
      </View>
      <View style={{flex: 1}}>
        <Text style={styles.siteCardTitle}>{site.name}</Text>
        <Text numberOfLines={1} style={styles.siteCardSubtitle}>Address: {site.address}</Text>
      </View>
    </View>
    <View style={styles.siteCardRight}>
      {/* <Text style={styles.manageText}>Manage</Text> */}
      <Ionicons name="chevron-forward" size={20} color={COLORS.textGrey} />
    </View>
  </TouchableOpacity>
);

/**
 * The dashed "Add New" button from your Home and Business List screens.
 */
const AddNewButton = ({ text, onPress }) => (
  <TouchableOpacity style={styles.addNewButton} onPress={onPress} activeOpacity={0.7}>
    <Feather name="plus" size={20} color={COLORS.primary} />
    <Text style={styles.addNewButtonText}>{text}</Text>
  </TouchableOpacity>
);

/**
 * A list item for the Members tab.
 * Styled to match your Profile screen lists.
 */
const MemberListItem = ({ member, isLast, businessIdParam }: {member: MemberType, isLast: boolean, businessIdParam: string}) => (
  <TouchableOpacity 
    onPress={()=> router.push({pathname: '/(businesses)/editMember', params: {memberId: member.userId._id, businessId: businessIdParam}})}
    style={[styles.memberItem, !isLast && styles.memberItemBorder]} 
    activeOpacity={0.7}
  >
    {/* Avatar / Initials */}
    <View style={styles.memberAvatarContainer}>
      {/* {!member.pending ? ( */}
        {/* // <Image source={{ uri: member.avatar }} style={styles.memberAvatar} /> */}
        <LinearGradient colors={['#3B50DF', '#7685FF']} style={styles.cardAvatar}>
                  <Text style={styles.cardAvatarText}>{member?.userId?.fullname?.split(" ")?.[0]?.charAt(0)}{member?.userId?.fullname?.split(" ")?.[1]?.charAt(0)}</Text>
                </LinearGradient>
      {/* ) : ( */}
        {/* <FontAwesome5 name="user-alt" size={18} color={COLORS.textGrey} /> */}
      {/* )} */}
    </View>

    {/* Name and Email/Status */}
    <View style={styles.memberTextContainer}>
      <Text style={styles.memberName}>{member.userId.fullname}</Text>
      <Text numberOfLines={1} style={styles.memberEmail}>{member.userId.email}</Text>
    </View>

    {/* Role Pill and Status */}
    <View style={styles.memberRoleContainer}>
      <View style={styles.rolePill}>
        <Text style={styles.roleText}>{member.role}</Text>
      </View>
      {/* {member.pending && (
        <Text style={styles.pendingText}>Pending</Text>
      )} */}
    </View>
    {/* <Ionicons name="chevron-forward" size={20} color={COLORS.textGrey} /> */}
  </TouchableOpacity>
);


// --- Tab Content Components ---

const SitesTab = ({sites}: {sites: siteType[]}) =>{
console.log(sites, 'business sites')
return (
  <View style={styles.contentContainer}>
    {sites?.map((site) => (
      <SiteCard key={site._id} site={site} />
    ))}
    <AddNewButton 
      text="Add New Site"
      onPress={() => {router.push('/(businesses)/addSite')}} 
    />
  </View>
)};

const MembersTab = ({members, businessIdParam}: {members: MemberType[], businessIdParam: string}) => (
  <View style={styles.contentContainer}>
    {/* Header for Member list */}
    <View style={styles.membersHeader}>
      <Text style={styles.membersTitle}>Organisation Members</Text>
      <TouchableOpacity onPress={() => { router.push('/(businesses)/inviteMember') }}>
        <Text style={styles.inviteButtonText}>Invite</Text>
      </TouchableOpacity>
    </View>

    {/* Member List Card */}
    <View style={styles.memberListContainer}>
      {members?.map((member, index) => (
        <MemberListItem 
          key={member._id} 
          member={member} 
          isLast={index === MEMBERS_DATA.length - 1} 
          businessIdParam={businessIdParam}
        />
      ))}
    </View>
  </View>
);

// --- Main Screen Component ---

export default function BusinessDetailsScreen() {
  const [activeTab, setActiveTab] = useState('sites'); // 'sites' or 'members'
const {userId} = useUser()
const { businessId } = useLocalSearchParams()
  const businessIdParam = typeof businessId === 'string' ? businessId : undefined

  const { data: businesses, isLoading: isBusinessesLoading, isError: isBusinessesError, error: businessesError, refetch: refetchBusinesses } = useQuery({
    queryKey: ['businesses', userId],
    queryFn: fetchBusinesses,
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  })

  const { data: business, isLoading: isBusinessLoading, isError: isBusinessError, error: businessError, refetch: refetchBusiness } = useQuery({
    queryKey: ['business', userId, businessIdParam],
    queryFn: ()=>{
      if (!businessIdParam) throw new Error("businessIdParam is undefined");
      return fetchBusiness(businessIdParam)
    },
    enabled: (!!userId && !!businessIdParam),
    staleTime: 1000 * 60 * 5,
  })

  console.log(business?.business?.sites, 'business')
  // console.log(businesses?.businesses?.sites, 'businesses')
  // console.log((businessesError as any)?.response, 'business error')
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Custom Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => { router.back() }} style={styles.headerIcon}>
          <Ionicons name="chevron-back" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>BIOS ltd</Text>
        <TouchableOpacity onPress={() => { /* Navigate to Edit Business Form */ }}>
          <Text style={styles.headerButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Segmented Control (Tabs) */}
        <View style={styles.segmentContainer}>
          <TouchableOpacity
            style={[
              styles.segmentButton,
              activeTab === 'sites' && styles.activeSegmentButton,
            ]}
            onPress={() => setActiveTab('sites')}
            activeOpacity={0.9}
          >
            <Text
              style={[
                styles.segmentText,
                activeTab === 'sites' && styles.activeSegmentText,
              ]}
            >
              Sites
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.segmentButton,
              activeTab === 'members' && styles.activeSegmentButton,
            ]}
            onPress={() => setActiveTab('members')}
            activeOpacity={0.9}
          >
            <Text
              style={[
                styles.segmentText,
                activeTab === 'members' && styles.activeSegmentText,
              ]}
            >
              Members
            </Text>
          </TouchableOpacity>
        </View>

        {/* Conditional Content based on active tab */}
        {activeTab === 'sites' ? <SitesTab sites={business?.business?.sites} /> : <MembersTab businessIdParam={businessIdParam!} members={business?.business?.members} />}
      </ScrollView>
    </SafeAreaView>
  );
}

// --- Styles ---

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
    // paddingTop: Constants.statusBarHeight,
  },
  // Header
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    // paddingVertical: 10,
    backgroundColor: COLORS.background,
  },
  headerIcon: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.black,
  },
  headerButtonText: {
    fontSize: 17,
    fontWeight: '400',
    color: COLORS.primary,
  },
  // Segmented Control
  segmentContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.segmentGrey,
    borderRadius: 10,
    margin: 16,
    padding: 3,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeSegmentButton: {
    backgroundColor: COLORS.white,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  segmentText: {
    fontSize: 15,
    fontWeight: '400',
    color: COLORS.textGrey,
  },
  activeSegmentText: {
    fontWeight: '600',
    color: COLORS.black,
  },
  // Content Area
  contentContainer: {
    padding: 16,
    paddingTop: 0,
  },
  // Site Card
  siteCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'black',
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
  siteCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    // backgroundColor: 'red'
  },
  siteIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primaryLighterBG,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  siteCardTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.black,
  },
  siteCardSubtitle: {
    fontSize: 14,
    flex: 1,
    color: COLORS.textGrey,
    marginTop: 2,
  },
  siteCardRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  manageText: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.textGrey,
    marginRight: 4,
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
  },
  addNewButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
    marginLeft: 8,
  },
  // Members Tab
  membersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  membersTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: COLORS.black,
  },
  inviteButtonText: {
    fontSize: 17,
    fontWeight: '500',
    color: COLORS.primary,
  },
  memberListContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  memberItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
  },
  memberAvatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.segmentGrey,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  memberAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
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
  memberTextContainer: {
    flex: 1,
    marginRight: 12,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.black,
  },
  memberEmail: {
    fontSize: 14,
    color: COLORS.textGrey,
    marginTop: 2,
  },
  memberRoleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rolePill: {
    backgroundColor: COLORS.primaryLighterBG,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  roleText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.primary,
  },
  pendingText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFA500', // Orange for pending
    marginLeft: 8,
  },
});