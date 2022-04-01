import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import golf from './assets/golf.jpg';
import Stock from './components/Stock.tsx';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.base}>
        <Text style={{color: 'green', fontSize: 42, textAlign: 'center'}}>GolfLager</Text>
        <Text style={{color: 'green', fontSize: 21, marginBottom: 4}}>Välkommen till vårt lager av golfklubbor!</Text>
        <Image source={golf} style={{ width: 320, height: 240, marginBottom: 20 }} />
        <Stock/>
        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  base: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 15,
    paddingRight: 12,
    fontWeight: '900',
  },
  
});