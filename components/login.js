import React, { useState } from 'react';
import { View, Text, TextInput,StyleSheet, TouchableOpacity, Button, Animated,
  ActivityIndicator,ImageBackground,Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import services from '../services/strata-api';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const[showError,setErrorMsg] = useState(false);

  
  const login=async (requestOptions) => {
    const data=await services.AuthenticatorResponse(requestOptions);
    console.log("Login data => "+data.message);
    return data.message;
  }

  const getUserName= async(userID) => {
    const data= await services.getUserName(userID);
    console.log("User Data => "+data.userName);
    return data.userName;
  }

  const handleSubmit = async () => {
    // make a request to your backend to check the credentials
    // and log the user in
    setErrorMsg(false);   
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: username.toString(), password: password.toString() })
    }; 
    
    loginResult=await login(requestOptions);

    console.log("Login Result => "+loginResult);
    //if(username.toString() == 'Venkatesh' && password.toString() == 'Arcash@01')
    if(loginResult=='Login Successful')
    {
        console.log("Login Success");
        user=await getUserName(username.toString());
        console.log("Username after getUserName => "+ user);
        navigation.navigate('Dashboard',{name:user,userId:username.toString()});
        
        
    }else
    {
        setErrorMsg(true);   
    }
    //navigation.navigate('Dashboard',{name:user,userId:username.toString()});
    //navigation.navigate('Dashboard',{name:"Venkatesh"});
  };

  

  const onPress = () => {};

  const [animationValue] = useState(new Animated.Value(1));

  const animateButton = () => {
    Animated.timing(animationValue, {
      toValue: 0.9,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const resetAnimation = () => {
    Animated.timing(animationValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const buttonStyle = {
    transform: [{ scale: animationValue }],
  };
  return (

    <View style={styles.container}>
      <ImageBackground source={require("../stratalogin1.png")} resizeMode="stretch" style={styles.image}>
      
       <Image
        style={styles.tinyLogo}
        source={require("../stratalogo.png")}
      />

      
        <Text style={{ color: "black", padding: 6, fontFamily: 'TrebuchetMS-Bold', fontSize: 20, marginLeft:-180 }}>Login</Text>
        <View><Text> {'\n'}</Text></View>
        <View style={styles.elementContainer}>
          <Text style={{ color: "white", padding: 6,marginLeft:12 }}>User ID:</Text>
          <TextInput style={styles.textInput}
            value={username}
            onChangeText={text => setUsername(text)} />
        </View>
        <View><Text> {'\n'}</Text></View>
        <View style={styles.elementContainer}>
          <Text style={{ color: "white", padding: 6 }}>Password:</Text>
          <TextInput style={styles.textInput}
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={true} />
        </View>
        <View><Text> {'\n'}</Text></View>
        {showError &&
          <View><Text style={{ color: 'red' }}> Username & Password not matched!{'\n'}</Text></View>}
        <TouchableOpacity onPress={() => {
          //animateButton();
          handleSubmit();
        } }
          //   onPressOut={resetAnimation}
          style={[styles.button, { buttonStyle }]}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        </ImageBackground>
      </View>
  );
};

export default Login;

const styles = StyleSheet.create({
    
    container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop : -160,
    backgroundColor:'white'
    //marginLeft : 20,
    //marginRight : 20
    },
    tinyLogo: {
    width: 100,
    height: 100,
  },
    textInput: {
        flex:2,
      backgroundColor: "#FFFFFF",
      color: "black",
      fontFamily: 'Cochin',
      sdmargin:12,
      flexWrap: 'wrap',
      
      height: 30,
      borderRadius: 100
      },

    
      elementContainer: {
    
        flexDirection: 'row',
        height:40,
        borderRadius: 100,
        backgroundColor: '#74B72E',
        color:"white",
        fontFamily: 'Cochin',
        fontSize: 14,
        flexWrap: 'wrap',
        padding: 5,
        justifyContent: 'space-around',
        width:'85%'
        
      },

      button: {
        backgroundColor: "#74B72E",
        padding: 10,
        borderRadius: 20,
        width:120,
        height:60,
        marginLeft: '40%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: "#ffffff",
        justifyContent: "center"
    
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
    },
    image: {
      backgroundColor:'#FFFFff',
      width:'100%',
      height:'100%',
       justifyContent: 'center',
       alignItems: 'center',
       }

    })