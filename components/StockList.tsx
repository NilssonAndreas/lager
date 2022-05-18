import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { Typography } from '../styles';

import productModel from '../models/Products'

export default function StockList({products, setProducts}) {

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
        {list}
      </View>
    );
  }