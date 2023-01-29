import React, { useState, useEffect } from 'react';
//import { useFocusEffect } from '@react-navigation/native';
import { View, ScrollView, Text, StyleSheet,TouchableOpacity } from 'react-native';
//import Swipeout from 'react-native-swipeout';
import { Avatar,Badge,Card } from '@rneui/themed';
import * as ticketDtl from '../assets/data/ticket-details.json'
import * as test from '../assets/data/test.json'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import services from '../services/strata-api';

export default function HomeScreen({route, navigation}){

  const weekday = ["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];
  const [tktDtl,setTktDtl] = useState(false);
  const {name,userId} = route.params;
  console.log("Name => "+ name+"; userId: "+userId);
  /* const tkt= props => {
    const[tktState, setTktState] = useState([])


  } */

  //const [tktDtl, setTicketDetail] = useState(() => tickets());

const dataList = [
{
  image_url: 'https://uifaces.co/our-content/donated/6MWH9Xi_.jpg',
},
{
  image_url: 'https://randomuser.me/api/portraits/men/36.jpg',
},
{
  image_url:
    'https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg',
},
{
  image_url:
    'https://cdn.pixabay.com/photo/2014/09/17/20/03/profile-449912__340.jpg',
},
{
  image_url:
    'https://cdn.pixabay.com/photo/2020/09/18/05/58/lights-5580916__340.jpg',
},
{
  image_url:
    'https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg',
},
];

for(let i=0;i< ticketDtl.data.length; i++)
{
  let obj=ticketDtl.data[i];
  console.log(obj.ticketNum);
}

const ticketsJson = () =>
{
  console.log("Type of Data => "+typeof ticketDtl.data+"; Type of object => "+typeof ticketDtl.data );
  
  return ticketDtl.data;
}


const createTicket = () => {
  console.log('You have been clicked a button!');
  navigation.navigate('createTicket',{agentId: userId});
  // do something
};

const getDay = (dt) => {
  console.log(dt);
  if(dt!=null)
  {
  newDt= new Date(dt).getDate()+weekday[new Date(dt).getDay()];
  console.log("New Date => "+newDt);
  return newDt;
  }else
  {
    return "Day not found";
  }

}

const tickets=async () => {
  const tktDtl=await services.getTickets();
  console.log("Ticket data => "+JSON.stringify(tktDtl));
  console.log("Ticket length => "+tktDtl.data.length);
  console.log("Is ticket Detail an array "+ Array.isArray(tktDtl.data));
  await tktDtl.data.map((data) => console.log("Test item => "+JSON.stringify(data)));
  //setTktDtl(tktDtl);
  //return JSON.stringify(tktDtl);
  return tktDtl.data;
}


  const[Tkts, setTkt] = useState(false);

  useEffect(() => {
    console.log("Inside useEffect");
    //fetch("https://strata-api.loca.lt/gettickets/"+userId)
    fetch("http://localhost:8099/gettickets/"+userId)
     .then(resp => resp.json())
     .then(data => setTkt(data))
    },[]);

    /* useFocusEffect(
      React.useCallback(() => {
        let isActive = true;
    
        console.log("Inside useEffect");
    fetch("https://strata-api.loca.lt/gettickets/"+userId)
     .then(resp => resp.json())
     .then(data => setTkt(data))
    
        return () => {
          isActive = false;
        };
      }, [userId])
    );
   */


     console.log("Tkts => "+ JSON.stringify(Tkts));


     const getTicket=(ticketId) => {
      console.log("Opening ticket => "+ ticketId)
      navigation.navigate('ticketDtl',{ticketID:ticketId});
     }


     let swipeBtns = [{
      text: 'Delete',
      backgroundColor: 'red',
      underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
      onPress: () => { deleteTicket() }
    }];

    const deleteTicket= () => {};

return (
  <>
    <ScrollView>
    <View style={styles.header}>
      <Text style={styles.subHeader}>Hi {name}</Text>
      <Avatar
        size={64}
        rounded
        source= {{ uri:  'https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg' }}
              
      />
      </View>


    
      <View >
        
          {Tkts && Tkts.data.map((data) => { 
            console.log("item => "+JSON.stringify(data));
            console.log("item ticket status => "+data.ticketStatus);
            let status=data.ticketStatus;
        //console.log("ticketID => "+data.ticketID);
    return (
    
      
    <TouchableOpacity onPress={() =>{getTicket(data.ticketID)} }>  
    <Card containerStyle={styles.row} borderRadius={25}>

      <Badge
        status = {data.ticketStatus}
        containerStyle={styles.statusInd}
      />
      <View style={[
    styles.container,
    {
      // Try setting `flexDirection` to `"row"`.
      flexDirection: 'row',flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
  ]}>
        <Text h1 style={styles.cardContent}>Ticket {data.ticketID}</Text>
        <Text h1 style={{color: "#FFFFFF"}}>{`${getDay(data.createDt)}`}</Text>
      </View>
      
      <View><Text> {'\n'}</Text></View>
    
      <View style={[
    styles.container,
    {
      // Try setting `flexDirection` to `"row"`.
      flexDirection: 'row',flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
  ]}>
    <Text style={{color: "#FFFFFF"}}>
      {data.desc}
    </Text>        
    <Text h4 style={[styles.TextViewStyle,  {color: "#FFFFFF"}]}>{data.totalMiles} miles</Text>
    </View>

  </Card>
  </TouchableOpacity>)
  // </Swipeout>
  })}
      </View>

      <View><Text> {'\n'}</Text></View>

      <View style={styles.screen}>
      <TouchableOpacity
        onPress={createTicket}
        style={styles.roundButton1}>
        <Text h1 style={{color:"white", fontSize: 25}}>+</Text>
      </TouchableOpacity>
      </View>

    </ScrollView>
  </>
);
}

const styles = StyleSheet.create({
subHeader: {
  //backgroundColor : "#2089dc",
  color : "black",
  textAlign : "center",
  paddingVertical : 5,
  marginBottom : 10,
  fontFamily: 'Cochin',
  fontSize: 20,
  fontWeight: 'bold',
},

header: {
flex: 1,
flexDirection: 'row',
flexWrap: 'wrap',
justifyContent: 'space-around',
marginTop : 40
},

row: {
  backgroundColor: "#7F7D9C",
  color: "#FFFFFF",
  flex: 1,
  flexDirection: 'column',
  fontFamily: 'Cochin'
  },

  TextViewStyle:
    {
       borderRadius: 10,
       padding: 5,
       backgroundColor: '#74B72E',
       overflow:"hidden"
 
    },

  cardContent:{
    color: "#FFFFFF",
    fontFamily: 'Cochin',
    fontSize: 20
  },

  roundButton1: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#74B72E',
    color:"white"
    
    //marginBottom: -10
  },
  statusInd: {
    width: 10,
    height: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf:'flex-end',
    padding: 5,
    borderRadius: 100,
    backgroundColor: '#74B72E'  
  },
  screen: {
    //width: '100%',
    //height: 50,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf:'center',
    marginBottom: 10,
    //alignItems: 'center',
    //position: 'absolute', //Here is the trick
    //bottom: 0
  },


  // h1Style: {
  //   color: "#FFFFFF",
  //   fontFamily: 'Cochin',
  //   fontWeight: '300'
  // }

})

//export default Avatars;