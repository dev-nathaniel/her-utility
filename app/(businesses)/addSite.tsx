import MailBoxIcon from '@/assets/icons/MailBoxIcon';
import UserIcon from '@/assets/icons/UserIcon';
import CustomDropdown from '@/components/CustomDropdown';
import CustomInput from '@/components/CustomInput';
import useUser from '@/hooks/useUser';
import { createSite, fetchBusinesses } from '@/lib/api';
import showToast from '@/utils/showToast';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
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
import { Business } from './businesses';


// --- Color Palette (From BusinessDetailsScreen) ---
const COLORS = {
  primary: '#5A55E8', // Vibrant purple-blue from buttons
  background: '#F9F9F9', // Light grey page background
  white: '#FFFFFF',
  black: '#000000',
  textGrey: '#8A8A8E', // Subtitle grey
  lightGrey: '#F0F0F0', // Border color
  inputBorder: '#E0E0E0', // Light border for inputs
  danger: '#FF3B30', // Error color
};

// --- Reusable Form Components ---

/**
 * A custom text input styled to match your Signup.png and Login.png
 */
// const CustomTextInput = ({ label, iconName, placeholder, value, onChangeText, error, ...props }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const IconComponent = iconName.includes('pin') ? MaterialIcons : FontAwesome5;

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

/**
 * The primary action button (like 'Next' or 'Sign Up')
 */
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

// --- Main Screen Component ---


const createSiteSchema = yup.object({
  business: yup.mixed<Business>().required("Business is required"),
  // members: yup.mixed<MemberUserType[]>(),
  name: yup.string().required("Full name is required"),
  // postcode: yup.string().required("Postcode is required"),
  address: yup.string().required("Address is required"),
  // password: yup.string().min(6, "At least 6 characters").required("Password is required"),
  // confirmPassword: yup
  //   .string()
  //   .oneOf([yup.ref("password"), undefined], "Passwords must match")
  //   .required("Confirm password is required"),
});

type SiteForm = yup.InferType<typeof createSiteSchema>

export default function AddSiteScreen() {
  const router = useRouter();
  const { register, handleSubmit, control, watch, formState: { errors } } = useForm<SiteForm>({
    resolver: yupResolver(createSiteSchema),
  });
  const [siteName, setSiteName] = useState('');
  const [postcode, setPostcode] = useState('');

  // Example for MPAN/MPRN, can be split into multiple fields
  const [mpan, setMpan] = useState('');
  const [mprn, setMprn] = useState('');

  // const [errors, setErrors] = useState({});

  // const validateForm = () => {
  //   let newErrors = {};
  //   if (!siteName) newErrors.siteName = 'Site name is required';
  //   if (!postcode) {
  //     newErrors.postcode = 'Postcode is required';
  //   } else if (postcode.length < 5) { // Simple validation example
  //     newErrors.postcode = 'Please enter a valid postcode';
  //   }

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  const handleSave = () => {
    // if (validateForm()) {
    //   // Form is valid
    //   console.log('Saving site:', { siteName, postcode, mpan, mprn });
    //   // On success, navigate back
    //   router.back();
    // }
  };
  const queryClient = useQueryClient()

  const { userId } = useUser()

  const { mutate, isError, isSuccess, isPending, data, error } = useMutation({
    mutationFn: createSite,
    onSuccess: (res) => {
      console.log('site created', res)
      showToast({ text1: "Site added successfully" })
      // invalidate cached user and site queries so the UI refreshes
      queryClient.invalidateQueries({ queryKey: ['user'] })
      queryClient.invalidateQueries({ queryKey: ['site'] })
      queryClient.invalidateQueries({ queryKey: ['sites'] })
      queryClient.invalidateQueries({ queryKey: ['businesses'] })
      queryClient.invalidateQueries({ queryKey: ['business'] })
      router.push('/(tabs)/home')
    },
    onError: (err) => {
      showToast({ type: "error", text1: "Something went wrong.", text2: "Please try again." })

      console.log('site create error', err)
      const status = (err as any)?.response?.status ?? (err as any)?.status ?? 'unknown'
      const message = (err as any)?.response?.data?.message ?? (err as any)?.message ?? String(err)
      console.log(message)
      // setErrorStatus(status)
      // setErrorMessage(message)
    }
  })

  const onSubmit: SubmitHandler<SiteForm> = (formData) => {
    // setErrorStatus(null)
    // setErrorMessage(null)
    console.log(formData)
    const { business, ...others } = formData
    mutate({ ...others, businessId: business._id, members: userId ? [{ userId }] : [] })
  }

  console.log(errors)

  console.log(watch("address"))

  if (isError) {
    console.log(error)


  }
  if (isPending) {
    console.log("registering business")
  }

  const { data: businesses, isLoading: isBusinessesLoading, isError: isBusinessesError, error: businessesError, refetch: refetchBusinesses } = useQuery({
    queryKey: ['businesses', userId],
    queryFn: fetchBusinesses,
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  })

  console.log(businesses, 'site create business')

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
          <Text style={styles.title}>Site Details</Text>
          <Text style={styles.subtitle}>Enter the details for your new site.</Text>

          {/* Form Inputs */}
          <View style={{ gap: 16 }}>
            <Controller
              control={control}
              name="business"
              render={({ field: { onChange, value } }) => (
                <CustomDropdown
                  title="Business"
                  value={value}
                  onChange={onChange}
                  options={businesses?.businesses}
                  error={errors.business}
                />
              )}
            />

            <Controller control={control} name='name' render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput error={errors.name} value={value} onChangeText={onChange} icon={<UserIcon type='secondary' />} placeholder='High branch' title='Site Name' />
            )}>
            </Controller>
            {/* <Controller control={control} name='postcode' render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput error={errors.postcode} {...register("postcode")} value={value} onChangeText={onChange} icon={<MailBoxIcon />} placeholder='LH1 6FG' title='Postcode' />
            )}>
            </Controller> */}
            <Controller control={control} name='address' render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput error={errors.address} value={value} onChangeText={onChange} icon={<MailBoxIcon />} placeholder='123 High str' title='Address' />
            )}>
            </Controller>
            {/* <Controller control={control} name='confirmPassword' render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput error={errors.confirmPassword} value={value} onChangeText={onChange} icon={<LockIcon />} placeholder='**********' title='Confirm Password' />
            )}>
            </Controller> */}
            {/* <Controller
              control={control}
              name="members"
              render={({ field: { onChange, value } }) => (
                <CustomDropdown
                  title="Members"
                  value={value}
                  onChange={onChange}
                  options={businesses?.businesses}
                  error={errors.business}
                />
              )}
            /> */}
          </View>
        </ScrollView>

        {/* Bottom Button Area */}
        <View style={styles.bottomContainer}>
          <PrimaryButton disabled={errors.root} text="Save Site" onPress={handleSubmit(onSubmit)} />
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