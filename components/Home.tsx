import { StatusBar } from 'expo-status-bar';
import { Image, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import golf from '../assets/golf.jpg';
import Stock from './Stock';
import { Base, Typography } from '../styles/';

export default function Home({products, setProducts}) {
  return (
    <SafeAreaView style={Base.container}>
      <ScrollView style={Base.base}>
        <Text style={ Typography.golfhead}>GolfLager</Text>
        <Text style={Typography.header3}>Välkommen till vårt lager av golfklubbor!</Text>
        <Image source={golf} style={Base.mImg} />
        <Stock products={products} setProducts={setProducts}/>
        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}
