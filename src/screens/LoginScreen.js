import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator, Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { supabase } from '../lib/supabase'

const LoginScreen = () => {
    const navigation = useNavigation() 
    const [email, setEmail] = useState('test@gmail.com')
    const [password, setPassword] = useState('123456')
    const [loading,setLoading]=useState(false)
    // const canLogin=()=>{
    //     //supabaselogin
    //     navigation.navigate("Home")
    // }
    async function signInWithEmail() {
        setLoading(true)
        const test= await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        })
    
        if (test.data.session.error) {
            Alert.alert(error.message)
            return
        }
       if(test.data.session.access_token){
        navigation.navigate("Home")
       }
      }

   
  return (
    <SafeAreaView style={{flex:1,alignItems:"center",justifyContent:"center",gap:10}}>
    <Text style={{fontSize:20,fontWeight:600,margin:10}}>Log in</Text>
     <TextInput value={email} onChangeText={(txt)=>setEmail(txt)} placeholder='E-mail' style={{borderWidth:1,fontSize:20,padding:5,width:"80%"}}/>
     <TextInput value={password} onChangeText={(txt)=>setPassword(txt)}  placeholder='password' style={{borderWidth:1,fontSize:20,padding:5,width:"80%"}}/>
     <TouchableOpacity onPress={()=>signInWithEmail()} style={{width:"80%",backgroundColor:"pink",alignItems:"center",justifyContent:"center",padding:3,borderRadius:10}}>
        <Text style={{color:"white",fontWeight:500,fontSize:20}}>Sign in</Text>
      </TouchableOpacity>
    
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})