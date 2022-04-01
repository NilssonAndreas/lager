import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import config from "../config/config.json";

function StockList() {
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      fetch(`${config.base_url}/products?api_key=${config.api_key}`)
        .then(response => response.json())
        .then(result => setProducts(result.data));
    }, []);
  
    const list = products.map((product, index) => <Text style={{color: 'black', borderWidth: 1, marginBottom: '2%', paddingLeft: '2%', fontSize: 18}} key={index}>{ product.name } | { product.stock }st</Text>);
  
    return (
      <View>
        <Text style={{color: '#333', fontSize: 24, textDecorationLine: 'underline', marginBottom: 7}}>Lagerförteckning</Text>
        {list}
      </View>
    );
  }

export default function Stock() {
  return (
    <View>
      <StockList/>
    </View>
  );
}

