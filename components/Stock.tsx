import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { Typography } from '../styles';

import productModel from '../models/Products'

  
function StockList({products, setProducts}) {

  useEffect(async () => {
    setProducts(await productModel.getProducts());
  }, []);

  const list =  products.map((product, index) => {
    return <Text
            key={index}
            style={{ ...Typography.listText }}
            >
              { product.name } - { product.stock }
            </Text>
  });
  return (
    <View>
      <Text style={Typography.listHead}>Lagerförteckning</Text>
      {list}
    </View>
  );
}

export default function Stock({products, setProducts}) {
  return (
    <View>
      <StockList products={products} setProducts={setProducts}/>
    </View>
  );
}

