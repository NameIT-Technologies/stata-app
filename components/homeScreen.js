import React, { useState, useEffect } from 'react';
//import { useFocusEffect } from '@react-navigation/native';
import { View, ScrollView, Text, StyleSheet,TouchableOpacity, ActivityIndicator, Modal, Pressable } from 'react-native';
//import Swipeout from 'react-native-swipeout';
import { Avatar,Badge,Card } from '@rneui/themed';
import * as ticketDtl from '../assets/data/ticket-details.json'
import * as test from '../assets/data/test.json'
import { NavigationContainer , useIsFocused} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import services from '../services/strata-api';

export default function HomeScreen({route, navigation}){

  const weekday = ["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];
  const [tktDtl,setTktDtl] = useState(false);
  const[loading, setLoading] = useState(true);
  const[showCompleted,setCompleted]=useState(false);
  const[showDeleteModal,setDeleteModal]=useState(false);
  const {name,userId} = route.params;
  console.log("Name => "+ name+"; userId: "+userId);
  const isFocused = useIsFocused();
  const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>
  /* const tkt= props => {
    const[tktState, setTktState] = useState([])


  } */

  //const [tktDtl, setTicketDetail] = useState(() => tickets());


  const [customerName, setCustomerName] = useState('');
  const [jobSite, setJobSite] = useState('');
  const [startMileage, setStartMileage] = useState(0);
  const [endMileage, setEndMileage] = useState(0);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState(new Date("9999-12-31"));
  const [desc, setDesc] = useState('');
  const[tktid, setTktId ] = useState('');


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
  navigation.navigate('createTicket',{agentId: userId, name: name});
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
    setLoading(true);
    console.log("Inside useEffect");
    fetch("http://ec2-13-232-162-26.ap-south-1.compute.amazonaws.com:8099/gettickets/"+userId)
    //fetch("https://strata-api.loca.lt/gettickets/"+userId)
    //fetch("http://192.168.1.9:8099/gettickets/"+userId)
     .then(resp => resp.json())
     .then(data => {
       setTkt(data);
       setLoading(false);
     })
    },[isFocused]);

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


     const getTicket=(ticketId,ticketStatus) => {
      console.log("Opening ticket => "+ ticketId+"; TicketStatus => "+ticketStatus)
      if(ticketStatus != "success")
      {
      navigation.navigate('ticketDtl',{ticketID:ticketId,name:name,userId:userId});
      }else{
          console.log("Completed tcket, so opening modal dialog")
          for(var i=0;i<Tkts.data.length;i++)
          {
            if(Tkts.data[i].ticketID==ticketId)
            {
              console.log("Ticket Match Found for "+ticketId);
              setCustomerName(Tkts.data[i].customerName)
              setJobSite(Tkts.data[i].jboSite);
              setStartMileage(Tkts.data[i].startMileage);
              setEndMileage(Tkts.data[i].endMileage);
              setDesc(Tkts.data[i].desc);
              setStartTime(Tkts.data[i].startTime);
              setEndTime(Tkts.data[i].endTime);
              setCompleted(true);
            }
          }
      }
     }




     /* let swipeBtns = [{
      text: 'Delete',
      backgroundColor: 'red',
      underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
      onPress: () => { deleteTicket() }
    }]; */



const removeTicket= (ticketId) => {
console.log("Deleting "+ticketId);
      for(var i=0;i<Tkts.data.length;i++)
          {
            if(Tkts.data[i].ticketID==ticketId)
            {
              console.log("Ticket Match Found for "+ticketId);
              var item= Tkts.data[i];
              setCustomerName(item.customerName);
              setJobSite(item.jboSite);
              setStartMileage(item.startMileage);
              setEndMileage(item.endMileage);
              setDesc(item.desc);
              setStartTime(item.startTime);
              setEndTime(item.endTime);
              setTktId(ticketId);
              setDeleteModal(true);
            }
          }
          
    };

    const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
    };


    const confirmDelete= async() => {
      setLoading(true);
      console.log("Confirm Delete for ticket "+ tktid);
      const data=await services.deleteTicket(tktid,requestOptions);
      console.log("Data => " + JSON.stringify(data));
      setTkt(data);
      setLoading(false);
    }



return (
  <>

  {loading && <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>}

     {!loading && <View style={styles.header}>
      <Text style={styles.subHeader}>Hi {name}</Text>
      <Avatar
        size={64}
        rounded
        source= {{ uri:  'https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg' }}
              
      />
      </View>}

     {!loading &&  <View style={styles.DefaultView}><ScrollView>
    

       
      <View >
        
          {Tkts && Tkts.data.map((data) => { 
            console.log("item => "+JSON.stringify(data));
            console.log("item ticket status => "+data.ticketStatus);
            let status=data.ticketStatus;
        //console.log("ticketID => "+data.ticketID);
    return (
    
      
    <TouchableOpacity onPress={() =>{getTicket(data.ticketID,data.ticketStatus)} }
              onLongPress={
                () => 
              {
                console.log("Long Press called");
                removeTicket(data.ticketID);
              }}
              
              delayLongPress={100}>  
    <Card containerStyle={styles.row} borderRadius={35}>

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


    </ScrollView></View>}
      {!loading && <View style={styles.screen}>
      <TouchableOpacity
        onPress={createTicket}
        style={styles.roundButton1}>
        <Text h1 style={{color:"white", fontSize: 25}}>+</Text>
      </TouchableOpacity>
      </View>}

<Modal
        animationType="slide"
        transparent={true}
        visible={showCompleted}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setConfirmation(!confirmMsg);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* <Text style={styles.modalText}>Hello World!</Text> */}
            {/* <Card containerStyle={styles.row} borderRadius={25}> */}
            <Text style={{color:"black",alignItems: 'center',justifyContent: 'center', fontSize:18}}>Ticket Details </Text>
            <View><Text> {'\n'}</Text></View>
            <Text style={{color:"black"}}><B>Customer:</B> {customerName}</Text>
            
            <Text style={{color:"black"}}><B>Job Site:</B> {jobSite}</Text>
            
            <Text style={{color:"black"}}><B>Start Mileage:</B> {startMileage}</Text>
            {/* <View><Text> {'\n'}</Text></View> */}
            <Text style={{color:"black"}}><B>End Mileage:</B> {endMileage}</Text>
            
            <Text style={{color:"black"}}><B>Work Description:</B> {desc}</Text>
            
      
            <Text style={{color:"black"}}><B>Start Time:</B> {startTime.toString()}</Text>
            
            <Text style={{color:"black"}}><B>End Time:</B> {endTime.toString()}</Text>
        {/* </Card> */}
        <View><Text> {'\n'}</Text></View>
        <View style={[styles.buttonHolder]}>
                <Pressable
                style={[styles.mobdalbutton, styles.buttonClose]}
                onPress={async () => {
                    //await handleSubmit();
                    setCompleted(!showCompleted);
                    //navigation.navigate('Dashboard',{name:name,userId:userId});
                    }}>
                <Text style={styles.textStyle}>OK</Text>
                </Pressable>

            </View>    
          </View>
        </View>
      </Modal>


      <Modal
        animationType="slide"
        transparent={true}
        visible={showDeleteModal}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setConfirmation(!confirmMsg);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* <Text style={styles.modalText}>Hello World!</Text> */}
            {/* <Card containerStyle={styles.row} borderRadius={25}> */}
            <Text style={{color:"black",alignItems: 'center',justifyContent: 'center', fontSize:18}}>Ticket Details </Text>
            <View><Text> {'\n'}</Text></View>
            <Text style={{color:"black"}}><B>Customer:</B> {customerName}</Text>
            
            <Text style={{color:"black"}}><B>Job Site:</B> {jobSite}</Text>
            
            <Text style={{color:"black"}}><B>Start Mileage:</B> {startMileage}</Text>
            {/* <View><Text> {'\n'}</Text></View> */}
            <Text style={{color:"black"}}><B>End Mileage:</B> {endMileage}</Text>
            
            <Text style={{color:"black"}}><B>Work Description:</B> {desc}</Text>
            
      
            <Text style={{color:"black"}}><B>Start Time:</B> {startTime.toString()}</Text>
            
            <Text style={{color:"black"}}><B>End Time:</B> {endTime.toString()}</Text>
        {/* </Card> */}
        <View><Text> {'\n'}</Text></View>
        <View style={[styles.buttonHolder]}>
                <Pressable
                style={[styles.mobdalbutton, styles.buttonClose]}
                onPress={async () => {
                    //await handleSubmit();
                    await confirmDelete();
                    setDeleteModal(false);
                    //navigation.navigate('Dashboard',{name:name,userId:userId});
                    }}>
                <Text style={styles.textStyle}>Delete</Text>
                </Pressable>

            </View>    
          </View>
        </View>
      </Modal>

  </>
);
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 4,
    flexDirection: 'row',
},
DefaultView: {
    flex: 4,
    //backgroundColor: '#000',
},
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
flex: 0.5,
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
    padding: 5,
    borderRadius: 100,
    backgroundColor: '#74B72E',
    color:"white"
    
    //marginBottom: -10
  },
  statusInd: {
    width: 15,
    height: 15,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf:'flex-end',
    padding: 5,
    borderRadius: 100,
    backgroundColor: '#74B72E',
    top:-15,
    left:10
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
  
  //Modal styling
  mobdalbutton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    flex:1,
    flexDirection: 'row',
    alignContent: 'space-between',
    //flexWrap: 'wrap',
    //alignSelf:'center',
    justifyContent: 'center',
    backgroundColor: "#74B72E"
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    //backgroundColor: '#2196F3',
  },textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  }, buttonHolder:
  {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf:'center',
    justifyContent: 'space-between'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
 modalView: {
            margin: 20,
            //position:"absolute",
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 35,
            //alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            width: "90%",
            height: "50%"
          },
          horizontal: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            padding: 10,
          }
//End of Modal styling
  // h1Style: {
  //   color: "#FFFFFF",
  //   fontFamily: 'Cochin',
  //   fontWeight: '300'
  // }

})

//export default Avatars;