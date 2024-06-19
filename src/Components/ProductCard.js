import React, { useEffect } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import useProductStore from '../states/productState';

const ProductCard = ({ marketId }) => {
  const products = useProductStore((state) => state.products);
  const fetchProductsByMarket = useProductStore((state) => state.fetchProductsByMarket);
  const increaseQuantity = useProductStore((state) => state.increaseQuantity);
  const decreaseQuantity = useProductStore((state) => state.decreaseQuantity);

  useEffect(() => {
    if (marketId) {
      fetchProductsByMarket(marketId);
    }
  }, []);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text>Products</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10,backgroundColor:"lightgray",alignItems:"center" }}>
              <Button title="-" onPress={() => decreaseQuantity(item.id, item.quantity)} />
            <Text>{item.name}</Text>
            <Text>{item.quantity}</Text>
            <Button title="+" onPress={() => increaseQuantity(item.id, item.quantity)} />
          </View>
        )}
      />
    </View>
  );
};

export default ProductCard;
