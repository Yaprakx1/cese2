import { Alert, FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import ProductCard from '../Components/ProductCard'
import { useMarketStore } from '../states/marketState'
import useProductStore from '../states/productState'

const MarketScreen = ({route}) => {
    console.log(route.params.id)
    const {products}=useProductStore(state=>state)
    const [renderProducts,setRenderProducts]=useState(
      products.filter(e=>e.market_id===route.params.id)
    )
    
    const [modalVisible, setModalVisible] = useState(false);
    const [productName, setProductName] = useState("");
    const [quantity, setQuantity] = useState(1);
    const {insertProduct}=useProductStore(state=>state)
    const AddProduct=()=>{
      if(productName.trim()===""){
        Alert.alert("Please enter a product name")
        return
      }
       insertProduct({market_id:route.params.id,name:productName,quantity:quantity})
       setProductName("")
        setQuantity(1)
    }
  return (
    <View>
        <TouchableOpacity style={{width:"100%",backgroundColor:"pink",alignItems:"center",justifyContent:"center",padding:3,borderRadius:10}}  onPress={()=>setModalVisible(true)}>
        <Text style={{color:"white",fontWeight:500,fontSize:20}}>Add Product</Text>
      </TouchableOpacity>
      <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}>
              <View style={{flex:1,marginHorizontal:"10%",marginVertical:"20%",justifyContent:"center",alignItems:"center",backgroundColor:"white",borderRadius:20}}>
                <TouchableOpacity onPress={()=>setModalVisible(false)} style={{position:"absolute",top:10,right:10}}><Text>X</Text></TouchableOpacity>
                <View style={{padding:10,width:"100%",gap:10,top:0,right:0}}>
                    <Text>
                      Enter a product Name!
                    </Text>
                      <TextInput onChangeText={(txt)=>{setProductName(txt)}} style={{borderWidth:1,fontSize:20,padding:5}}/>
                      <Text>
                      Enter a quantity!
                    </Text>
                    <View style={{flexDirection:"row", justifyContent:"space-around",alignItems:"center"}}>
                    <TouchableOpacity onPress={()=>{setQuantity(prev=>prev!=0?prev-1:0)}}><Text style={{fontSize:30}}>-</Text></TouchableOpacity>
                    <Text>{quantity}</Text>
                    <TouchableOpacity onPress={()=>{setQuantity(prev=>prev+1)}}><Text style={{fontSize:30}}>+</Text></TouchableOpacity>
                    </View>
                      <TouchableOpacity onPress={()=>{AddProduct(),setModalVisible(false)}} style={{backgroundColor:"pink",padding:5,alignItems:"center",justifyContent:"center",borderRadius:20}}>
                        <Text style={{color:"white",fontWeight:500,fontSize:20}}>Add</Text>
                      </TouchableOpacity>
                  </View> 
              </View>
            </Modal>
      <FlatList
      ListEmptyComponent={()=><Text>There is no product in this market</Text>}
        data={renderProducts}
        keyExtractor={item=>item.id.toString()}
        renderItem={({item})=>(
            <ProductCard item={renderProducts}  />
         )}
      />
    </View>
  )
 
}

export default MarketScreen

const styles = StyleSheet.create({})