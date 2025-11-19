import useUser from '@/hooks/useUser';
import { fetchBusinessMember } from '@/lib/api';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MemberUserType } from './business';

// --- Color Palette (From previous screens) ---
const COLORS = {
  primary: '#5A55E8', // Vibrant purple-blue from buttons
  background: '#F9F9F9', // Light grey page background
  white: '#FFFFFF',
  black: '#000000',
  textGrey: '#8A8A8E', // Subtitle grey
  lightGrey: '#F0F0F0', // Border color
  inputBorder: '#E0E0E0', // Light border for inputs
  danger: '#FF3B30', // Error color from Profile.png
  dangerLightBG: 'rgba(255, 59, 48, 0.05)',
  primaryLighterBG: 'rgba(90, 85, 232, 0.1)', // Icon BG / Pill BG
  segmentGrey: '#EFEFF4',
};

// --- Type Definitions ---
type RoleID = 'owner' | 'manager' | 'viewer';

interface Role {
  id: RoleID;
  name: string;
  description: string;
}

interface Member {
  id: string;
  name: string;
  email: string;
  role: RoleID;
  avatar: string | null;
}

// --- Mock Data ---
const ROLES: Role[] = [
  {
    id: 'owner',
    name: 'Admin',
    description: 'Full access to manage business, sites, and members.',
  },
  {
    id: 'manager',
    name: 'Site Manager',
    description: 'Can manage specific sites they are assigned to.',
  },
  {
    id: 'viewer',
    name: 'Viewer',
    description: 'View-only access to sites and utility data.',
  },
];

// Mock the member being edited. In a real app, you'd fetch this using the param.
const MOCK_MEMBER: Member = {
  id: '2',
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  role: 'manager',
  avatar: 'https://placehold.co/100x100/EFEFEF/333?text=JD',
};

// --- Reusable Components ---

interface PrimaryButtonProps {
  text: string;
  onPress: () => void;
  disabled?: boolean;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ text, onPress, disabled }) => (
  <TouchableOpacity
    style={[styles.primaryButton, disabled && styles.primaryButtonDisabled]}
    onPress={onPress}
    disabled={disabled}
    activeOpacity={0.8}
  >
    <Text style={styles.primaryButtonText}>{text}</Text>
  </TouchableOpacity>
);

interface RoleSelectorProps {
  selectedRole: RoleID | undefined;
  onSelectRole: (roleId: RoleID) => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ selectedRole, onSelectRole }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Assign a Role</Text>
      <View>
        {ROLES.map((role) => {
          const isSelected = role.id === selectedRole;
          return (
            <TouchableOpacity
              key={role.id}
              style={[styles.roleOption, isSelected && styles.roleOptionSelected]}
              onPress={() => onSelectRole(role.id)}
              activeOpacity={0.7}
            >
              <View style={[styles.radioOuter, isSelected && styles.radioOuterSelected]}>
                {isSelected && <View style={styles.radioInner} />}
              </View>
              <View style={styles.roleTextContainer}>
                <Text style={[styles.roleName, isSelected && styles.roleNameSelected]}>
                  {role.name}
                </Text>
                <Text style={styles.roleDescription}>{role.description}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

// --- Confirmation Modal Component ---
// Styled after your `Profile (1).png` logout modal

interface ConfirmModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  memberName: string;
}

const ConfirmRemoveModal: React.FC<ConfirmModalProps> = ({ visible, onClose, onConfirm, memberName }) => (
  <Modal
    animationType="fade"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <View style={styles.modalBackdrop}>
      <View style={styles.modalContainer}>
        {/* You could add an illustration here if you have one */}
        <Text style={styles.modalTitle}>Are you sure?</Text>
        <Text style={styles.modalSubtitle}>
          This will permanently remove <Text style={styles.boldText}>{memberName}</Text> from the organisation.
        </Text>
        
        <TouchableOpacity
          style={styles.modalButtonDanger}
          onPress={onConfirm}
        >
          <Text style={styles.modalButtonDangerText}>Remove Member</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.modalButtonCancel}
          onPress={onClose}
        >
          <Text style={styles.modalButtonCancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

// --- Main Screen Component ---

export default function EditMemberRoleScreen() {
  const router = useRouter();
  // Get memberId from route, e.g., /.../2/edit-role
    const {userId} = useUser()
  
  const { memberId, businessId } = useLocalSearchParams();
  const memberIdParam = typeof memberId === 'string' ? memberId : undefined
  const businessIdParam = typeof businessId === 'string' ? businessId : undefined

  const { data: memberDetails, isLoading: isMemberLoading, isError: isMemberError, error: memberError, refetch: refetchMember } = useQuery<MemberUserType>({
      queryKey: ['member', memberIdParam, businessIdParam],
      queryFn: () => {
        // If your API expects a site id, map location -> site id using `sites`.
        // Otherwise pass the location string directly.
        // const site = sites?.find((s: any) => s.location === location)
        // const arg = location?._id as string
      if (!memberIdParam) throw new Error("memberId is undefined");
      if (!businessIdParam) throw new Error("businessId is undefined");
    
        return fetchBusinessMember(businessIdParam, memberIdParam)
      },
      enabled: (!!userId && !!memberIdParam && !!businessIdParam),
      staleTime: 1000 * 60 * 5,
    })


    console.log(memberError, 'member error')
    console.log(memberDetails, 'member details')
  
  // In a real app, fetch member data based on memberId
  // const [member, setMember] = useState<Member | null>(null);
  // useEffect(() => { /* fetch member */ }, [memberId]);
  
  // For this example, we use mock data
  const member = MOCK_MEMBER; 

  const [selectedRole, setSelectedRole] = useState<RoleID>();

  useEffect(() => {
    if (!selectedRole && memberDetails && memberDetails.role) {
    setSelectedRole(memberDetails.role)
  }
  }, [memberDetails, selectedRole])
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleSave = () => {
    console.log('Saving changes:', { memberId, newRole: selectedRole });
    router.back();
  };
  
  const handleConfirmRemove = () => {
    console.log('Removing member:', memberId);
    setShowConfirmModal(false);
    router.back(); // Or navigate to the list
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Member Info Card */}
          <View style={styles.memberInfoCard}>
            <View style={styles.memberAvatarContainer}>
              {/* {member.avatar ? ( */}
                {/* <Image source={{ uri: member.avatar }} style={styles.memberAvatar} /> */}
              {/* // ) : ( */}
                <FontAwesome5 name="user-alt" size={18} color={COLORS.textGrey} />
              {/* )} */}
            </View>
            <View style={styles.memberTextContainer}>
              <Text style={styles.memberName}>{memberDetails?.fullname}</Text>
              <Text style={styles.memberEmail}>{memberDetails?.email}</Text>
            </View>
          </View>
          
          {/* Role Selector */}
          <RoleSelector 
            selectedRole={selectedRole} 
            onSelectRole={setSelectedRole} 
          />
          
          {/* Spacer */}
          <View style={{ height: 24 }} />
          
          {/* Remove Member Button */}
          <TouchableOpacity 
            style={styles.dangerButton}
            onPress={() => setShowConfirmModal(true)}
          >
            <Feather name="trash-2" size={18} color={COLORS.danger} />
            <Text style={styles.dangerButtonText}>Remove from Organisation</Text>
          </TouchableOpacity>
          
        </ScrollView>

        {/* Bottom Button Area */}
        <View style={styles.bottomContainer}>
          <PrimaryButton 
            text="Save Changes" 
            onPress={handleSave} 
            disabled={selectedRole === member.role} 
          />
          <TouchableOpacity onPress={() => router.back()} style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      
      {/* Confirmation Modal */}
      <ConfirmRemoveModal
        visible={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmRemove}
        memberName={member.name}
      />
    </SafeAreaView>
  );
}

// --- Styles ---

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  flex: {
    flex: 1,
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  boldText: {
    fontWeight: '600',
    color: COLORS.black,
  },
  // Member Info
  memberInfoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
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
  // Form Input
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.primary,
    marginBottom: 8,
    marginLeft: 4,
  },
  // Role Selector
  roleOption: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    padding: 16,
    marginBottom: 12,
  },
  roleOptionSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLighterBG,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.inputBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
    marginRight: 16,
  },
  radioOuterSelected: {
    borderColor: COLORS.primary,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
  },
  roleTextContainer: {
    flex: 1,
  },
  roleName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.black,
  },
  roleNameSelected: {
    color: COLORS.primary,
  },
  roleDescription: {
    fontSize: 14,
    color: COLORS.textGrey,
    marginTop: 4,
  },
  // Danger Button
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.dangerLightBG,
    height: 56,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.danger,
  },
  dangerButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.danger,
    marginLeft: 8,
  },
  // Bottom Area
  bottomContainer: {
    padding: 24,
    paddingTop: 12,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGrey,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  primaryButtonDisabled: {
    backgroundColor: COLORS.textGrey,
    elevation: 0,
    shadowOpacity: 0,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.white,
  },
  secondaryButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.primary,
  },
  // Modal Styles
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 24,
    width: '85%',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.black,
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 16,
    color: COLORS.textGrey,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  modalButtonDanger: {
    backgroundColor: COLORS.danger,
    borderRadius: 30,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  modalButtonDangerText: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.white,
  },
  modalButtonCancel: {
    backgroundColor: 'transparent',
    borderRadius: 30,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 8,
  },
  modalButtonCancelText: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.primary,
  },
});