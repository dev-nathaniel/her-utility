import GasPipeIcon from '@/assets/icons/GasPipeIcon';
import UtilityDetails from '@/components/UtilityDetails';
import UtilitySummaryWidget from '@/components/UtilitySummaryWidget';
import Colors from '@/constants/Colors';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function Utility() {
  return (
    <SafeAreaView edges={['left', 'right', 'top']} style={styles.container}>
      <UtilitySummaryWidget icon={<GasPipeIcon type='custom' color={Colors.light.white} />} utility='Gas supply'  />

      <View style={{marginTop: 24, flex: 1}}>
        <UtilityDetails />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDEEF0',
    paddingHorizontal: 16
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
