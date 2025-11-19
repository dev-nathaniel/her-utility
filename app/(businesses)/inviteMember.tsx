import MailBoxIcon from '@/assets/icons/MailBoxIcon';
import CustomInput from '@/components/CustomInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as yup from "yup";


// --- Color Palette (From previous screens) ---
const COLORS = {
  primary: '#5A55E8', // Vibrant purple-blue from buttons
  background: '#F9F9F9', // Light grey page background
  white: '#FFFFFF',
  black: '#000000',
  textGrey: '#8A8A8E', // Subtitle grey
  lightGrey: '#F0F0F0', // Border color
  inputBorder: '#E0E0E0', // Light border for inputs
  danger: '#FF3B30', // Error color
  primaryLighterBG: 'rgba(90, 85, 232, 0.1)', // Icon BG / Pill BG
};

// --- Mock Data ---
const ROLES = [
  {
    id: 'admin',
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

// --- Reusable Form Components (from AddSiteScreen) ---

// const CustomTextInput = ({ label, iconName, placeholder, value, onChangeText, error, ...props }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const IconComponent = iconName.includes('envelope') ? FontAwesome5 : MaterialIcons;

//   return (
//     <View style={styles.inputContainer}>
//       <Text style={styles.inputLabel}>{label}</Text>
//       <View 
//         style={[
//           styles.inputWrapper, 
//           isFocused && styles.inputWrapperFocused,
//           error && styles.inputWrapperError
//         ]}
//       >
//         <IconComponent 
//           name={iconName} 
//           size={20} 
//           color={isFocused ? COLORS.primary : COLORS.textGrey} 
//           style={styles.inputIcon} 
//         />
//         <TextInput
//           style={styles.textInput}
//           placeholder={placeholder}
//           placeholderTextColor={COLORS.textGrey}
//           value={value}
//           onChangeText={onChangeText}
//           onFocus={() => setIsFocused(true)}
//           onBlur={() => setIsFocused(false)}
//           {...props}
//         />
//       </View>
//       {error && <Text style={styles.errorText}>{error}</Text>}
//     </View>
//   );
// };

const PrimaryButton = ({ text, onPress, disabled }) => (
  <TouchableOpacity
    style={[styles.primaryButton, disabled && styles.primaryButtonDisabled]}
    onPress={onPress}
    disabled={disabled}
    activeOpacity={0.8}
  >
    <Text style={styles.primaryButtonText}>{text}</Text>
  </TouchableOpacity>
);

/**
 * A new component for selecting a role.
 * Styled to match your 'Get quote' radio buttons.
 */
const RoleSelector = ({ selectedRole, onSelectRole }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Assign a Role</Text>
      <View style={styles.roleContainer}>
        {ROLES.map((role) => {
          const isSelected = role.id === selectedRole;
          return (
            <TouchableOpacity
              key={role.id}
              style={[
                styles.roleOption,
                isSelected && styles.roleOptionSelected
              ]}
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

const loginSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, "At least 6 characters").required("Password is required"),
  role: yup.string().required("Role is required")
}).required()
// --- Main Screen Component ---
type LoginForm = yup.InferType<typeof loginSchema>


export default function InviteMemberScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState(null);
  // const [errors, setErrors] = useState({});
  const { register, handleSubmit, control, watch, formState: { errors } } = useForm<LoginForm>({
    resolver: yupResolver(loginSchema)
  })

  // const validateForm = () => {
  //   let newErrors = {};
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  //   if (!email) {
  //     newErrors.email = 'Email address is required';
  //   } else if (!emailRegex.test(email)) {
  //     newErrors.email = 'Please enter a valid email address';
  //   }

  //   if (!selectedRole) {
  //     newErrors.role = 'Please select a role';
  //   }

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  const handleSendInvite = () => {
    // if (validateForm()) {
    //   // Form is valid
    //   console.log('Sending invite:', { email, role: selectedRole });
    //   // On success, navigate back
    //   router.back();
    // }
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
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Invite New Member</Text>
          <Text style={styles.subtitle}>
            They will be invited to the <Text style={styles.boldText}>BIOS ltd</Text> organisation.
          </Text>

          {/* Form Inputs */}
          <View style={{ gap: 16 }}>
            {/* <CustomInput
            // label="Email Address"
            // iconName="envelope"
            placeholder="example@email.com"
            value={email}
            // onChangeText={setEmail}
            error={errors.email}
          // keyboardType="email-address"
          // autoCapitalize="none"
          /> */}
            <Controller control={control} name='email' render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput error={errors.email} value={value} onChangeText={onChange} icon={<MailBoxIcon />} placeholder='example@email.com' title='Email Address' />
            )}>
            </Controller>

            <RoleSelector
              selectedRole={selectedRole}
              onSelectRole={setSelectedRole}
            />
            {errors.role && <Text style={styles.errorText}>{errors.role.message}</Text>}
          </View>
        </ScrollView>

        {/* Bottom Button Area */}
        <View style={styles.bottomContainer}>
          <PrimaryButton
            text="Send Invite"
            onPress={handleSendInvite}
            disabled={!email || !selectedRole}
          />
          <TouchableOpacity onPress={() => router.back()} style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  headerTitle: {
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textGrey,
    marginBottom: 32,
    lineHeight: 22,
  },
  boldText: {
    fontWeight: '600',
    color: COLORS.black,
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
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    paddingHorizontal: 16,
    height: 56,
  },
  inputWrapperFocused: {
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  inputWrapperError: {
    borderColor: COLORS.danger,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.black,
    height: '100%',
  },
  errorText: {
    fontSize: 13,
    color: COLORS.danger,
    marginTop: 6,
    marginLeft: 4,
  },
  // Role Selector
  roleContainer: {
    // No container, just a list of options
  },
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
});