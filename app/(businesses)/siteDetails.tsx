import useUser from '@/hooks/useUser';
import { fetchSiteDetails } from '@/lib/api';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
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
import { MemberType } from './business';

// --- Color Palette (From previous screens) ---
const COLORS = {
  primary: '#5A55E8', // Vibrant purple-blue from buttons
  background: '#F9F9F9', // Light grey page background
  segmentGrey: '#EFEFF4',
  white: '#FFFFFF',
  black: '#000000',
  textGrey: '#8A8A8E', // Subtitle grey
  lightGrey: '#F0F0F0', // Border color
  primaryLightBG: 'rgba(90, 85, 232, 0.05)',
  primaryLighterBG: 'rgba(90, 85, 232, 0.1)', // Icon BG / Pill BG
};

// --- Mock Data ---
const SITE_DETAILS = {
  id: '1',
  name: 'Sharmile',
  postcode: 'LE2 0JF',
  mpan: '22 1234 5678 901',
  mprn: '1234567890',
};

const SITE_MEMBERS_DATA = [
  {
    id: '2',
    name: 'Jane Doe',
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
    avatar: null,
    pending: true,
  },
  // Note: 'Adebayo Olowo' (Admin) is not here, as he is an Org-level member
];

// --- Reusable Components ---

/**
 * A list item for the Members tab.
 * (Copied from BusinessDetailsScreen)
 */
const MemberListItem = ({ member, isLast, childKey }: {member: MemberType, isLast: boolean, childKey: any}) => (
  <TouchableOpacity 
    style={[styles.memberItem, !isLast && styles.memberItemBorder]} 
    activeOpacity={0.7}
    key={childKey}
  >
    {/* Avatar / Initials */}
    <View style={styles.memberAvatarContainer}>
      {/* {member.avatar ? ( */}
        {/* <Image source={{ uri: member.avatar }} style={styles.memberAvatar} /> */}
      {/* ) : ( */}
        <FontAwesome5 name="user-alt" size={18} color={COLORS.textGrey} />
      {/* )} */}
    </View>

    {/* Name and Email/Status */}
    <View style={styles.memberTextContainer}>
      <Text style={styles.memberName}>{member?.userId?.fullname}</Text>
      <Text style={styles.memberEmail}>{member?.userId?.email}</Text>
    </View>

    {/* Role Pill and Status */}
    <View style={styles.memberRoleContainer}>
      <View style={styles.rolePill}>
        <Text style={styles.roleText}>{member.role}</Text>
      </View>
      {/* {member.pending && ( */}
        {/* <Text style={styles.pendingText}>Pending</Text> */}
      {/* )} */}
    </View>
    {/* <Ionicons name="chevron-forward" size={20} color={COLORS.textGrey} /> */}
  </TouchableOpacity>
);

/**
 * A simple row for displaying a detail (label + value)
 * Inspired by 'iPhone 16 Pro - 16.png'
 */
const DetailRow = ({ label, value, isLast }) => (
  <View style={[styles.detailRow, !isLast && styles.detailRowBorder]}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

// --- Main Screen Component ---

export default function SiteDetailsScreen() {
  const router = useRouter();
  const {userId} = useUser()
  const { siteId } = useLocalSearchParams()
    const siteIdParam = typeof siteId === 'string' ? siteId : undefined
  const { data: siteDetails, isLoading: isSiteLoading, isError: isSiteError, error: siteError, refetch: refetchSite } = useQuery<{site: siteType}>({
      queryKey: ['site', siteIdParam],
      queryFn: () => {
        // If your API expects a site id, map location -> site id using `sites`.
        // Otherwise pass the location string directly.
        // const site = sites?.find((s: any) => s.location === location)
        // const arg = location?._id as string
      if (!siteIdParam) throw new Error("siteId is undefined");
        return fetchSiteDetails(siteIdParam)
      },
      enabled: (!!userId && !!siteIdParam),
      staleTime: 1000 * 60 * 5,
    })

    console.log(siteError, 'site details')

  return (
    <SafeAreaView style={styles.safeArea}>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Site Info Card */}
        <View style={styles.contentContainer}>
          <View style={styles.siteHeaderCard}>
            <View style={styles.siteIconContainer}>
              <MaterialIcons name="location-pin" size={24} color={COLORS.primary} />
            </View>
            <Text style={styles.siteName}>{siteDetails?.site?.name}</Text>
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => { /* router.push(`/(app)/sites/${SITE_DETAILS.id}/edit`); */ }}
            >
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.detailsListContainer}>
            <DetailRow label="Address" value={siteDetails?.site?.address} />
            {/* <DetailRow label="MPAN (Electricity)" value={siteDetails?.mpan} /> */}
            {/* <DetailRow label="MPRN (Gas)" value={SITE_DETAILS.mprn} isLast /> */}
          </View>
        </View>

        {/* Members List */}
        <View style={styles.contentContainer}>
          <View style={styles.membersHeader}>
            <Text style={styles.membersTitle}>Site Members</Text>
            {/* <TouchableOpacity onPress={() => {  }}>
              <Text style={styles.inviteButtonText}>Invite</Text>
            </TouchableOpacity> */}
          </View>

          <View style={styles.memberListContainer}>
            {siteDetails?.site?.members?.map((member, index) => (
              <MemberListItem 
              childKey={index}
                key={index} 
                member={member} 
                isLast={index === siteDetails.site?.members?.length - 1} 
              />
            ))}
          </View>
        </View>
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
    marginLeft: Platform.OS === 'ios' ? 8 : 0,
  },
  headerTitleStyle: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.black,
  },
  contentContainer: {
    padding: 16,
  },
  // Site Info Card
  siteHeaderCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
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
  siteIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primaryLighterBG,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  siteName: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.black,
    flex: 1,
  },
  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: COLORS.segmentGrey,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.black,
  },
  // Details List
  detailsListContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    marginTop: 16,
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
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  detailRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
  },
  detailLabel: {
    fontSize: 16,
    color: COLORS.textGrey,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.black,
    flex: 1,
    textAlign: 'right',
    marginLeft: 16,
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