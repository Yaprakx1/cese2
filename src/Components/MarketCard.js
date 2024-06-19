import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import useProductStore from '../states/productState'

const MarketCard = ({item: marketItems}) => {
  console.log(marketItems.id)
    const navigation = useNavigation()
    const {fetchProductsByMarket}=useProductStore(state=>state)

    let totalProduct=0;
    const totalProductRange=marketItems?.products?.length;
    marketItems?.products?.map(
        (product)=>{
            totalProduct+=product?.quantity;
        }
    )
    useEffect(()=>{
        fetchProductsByMarket(marketItems.id)
      
    },[])
    useEffect(()=>{
    },[])

  return (
    <TouchableOpacity style={{width:200,backgroundColor:"lightgreen", borderRadius:10,margin:10}} onPress={()=>{navigation.navigate("Market",id={id:marketItems.id})}}>
      <Text>{marketItems.id}</Text>
      <Text>Market Name:{marketItems.name}</Text>
      <Text>Total Product Range:{totalProductRange}</Text>
      <Text>Total Product:{totalProduct}</Text>
    </TouchableOpacity>
  )
}

export default MarketCard

const styles = StyleSheet.create({})