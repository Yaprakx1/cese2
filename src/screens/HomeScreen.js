import { Alert, FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useMarketStore } from '../states/marketState'
import MarketCard from '../Components/MarketCard'
import { useBrandStore } from '../states/brandState'
import { supabase } from '../lib/supabase'

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const {markets,addMarket,setMarket}=useMarketStore(state=>state)
  const {setBrands,brands}=useBrandStore(state=>state)
  const fetchMarketsByBrand = async (brandId) => {
    const { data, error } = await supabase
      .from('Market')
      .select('*')
      .eq('brand_id', brandId); // assuming 'brandId' is the foreign key in the Market table
    if (error) throw error;
    setMarket(data);
  };
    const fetchBrands=async()=>{
      let { data: Brand, error } = await supabase
      .from('Brand')
      .select('*');
      setBrands(Brand)
  }
  useEffect(()=>{
    fetchBrands()
  },[])
  useEffect(()=>{
   fetchMarketsByBrand(1)
  },[])
  const [market, setStateMarket] = useState(
    {
            id:"",
            name:"",
            products:[]
        }
        
      );
      const AddMarket=()=>{
        if(market.name.trim()===""){
          Alert.alert("Please enter a market name")
          return
        }
        addMarket(market)
       }

  return (
    <View style={{flex:1,justifyContent:"center",alignItems:"center",padding:5}} >
      <TouchableOpacity style={{width:"100%",backgroundColor:"pink",alignItems:"center",justifyContent:"center",padding:3,borderRadius:10}}  onPress={()=>setModalVisible(true)}>
        <Text style={{color:"white",fontWeight:500,fontSize:20}}>Add Market</Text>
      </TouchableOpacity>
       <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}>
              <View style={{flex:1,marginHorizontal:"10%",marginVertical:"20%",justifyContent:"center",alignItems:"center",backgroundColor:"white",borderRadius:20}}>
                <TouchableOpacity onPress={()=>setModalVisible(false)} style={{position:"absolute",top:10,right:10}}><Text>X</Text></TouchableOpacity>
                <View style={{padding:10,width:"100%",gap:10,top:0,right:0}}>
                    <Text>
                      Enter a market name!
                    </Text>
                      <TextInput onChangeText={(txt)=>{setStateMarket({...market,name:txt,id:new Date().getTime().toString()})}} style={{borderWidth:1,fontSize:20,padding:5}}/>
                      <TouchableOpacity onPress={()=>{AddMarket(),setModalVisible(false)}} style={{backgroundColor:"pink",padding:5,alignItems:"center",justifyContent:"center",borderRadius:20}}>
                        <Text style={{color:"white",fontWeight:500,fontSize:20}}>Add</Text>
                      </TouchableOpacity>
                  </View> 
              </View>
            </Modal>
      <FlatList
        data={markets}
        keyExtractor={item=>item.id.toString()}
        renderItem={({item})=>(
         <MarketCard item={item} />
        )}
      />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})