
import {Text,View } from 'react-native';
import StockList from './StockList';
import { Typography } from '../styles';
  
export default function Stock({products, setProducts}) {
  return (
    <View>
      <Text style={Typography.listHead}>Lagerförteckning</Text>
      <StockList products={products} setProducts={setProducts}/>
    </View>
  );
}

