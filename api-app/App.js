import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Weather from './src/api/Weather';

export default function App() {
  return (
    <View style={styles.container}>
      <Weather/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00aecc',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
