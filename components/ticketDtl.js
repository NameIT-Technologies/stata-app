import React, { useState, useEffect }  from 'react';
import { View, TextInput,Text, TimePicker,SafeAreaView,TouchableOpacity, Image, Button,
    StyleSheet, ScrollView, StatusBar, Animated, Modal, Pressable } from "react-native";
    import { Card } from '@rneui/themed';
    import { NavigationContainer } from '@react-navigation/native';
    import { createNativeStackNavigator } from '@react-navigation/native-stack';
    import services from '../services/strata-api';
    //import DateTimePicker from '@react-native-community/datetimepicker';
    import DateTimePicker from "react-native-modal-datetime-picker";

export default function TicketDtl({route, navigation}) {

    const weekday = ["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];
    var currentDay = weekday[new Date().getDay()]; //To get the Current Date

    const [customerName, setCustomerName] = useState('');
  const [jobSite, setJobSite] = useState('');
  const [startMileage, setStartMileage] = useState(0);
  const [endMileage, setEndMileage] = useState(0);
  const [confirmMsg,setConfirmation]=useState(false); 
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState(new Date("9999-12-31"));
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [desc, setDesc] = useState('');
  const [miles, setDerivedMiles] = useState(0);
  const[createDt,setCreateDt]= useState('');
  const[mgrId,setMgrId]= useState('');
  const[totalHrs,setTotalHrs]= useState(0);
  const[agentId,setAgentId]= useState(0);

  const {ticketID} = route.params;

useEffect(() => {
    console.log("Inside useEffect"+ticketID);
    fetch("https://strata-api.loca.lt/getticket/"+ticketID)
     .then(resp => resp.json())
     .then(async data => {
        console.log("Get ticketDtls"+ JSON.stringify(data));
        console.log("ticketID: "+data[0].ticketID+"; totalHrs :"+data[0].totalHrs+"; ticketStatus: "+data[0].ticketStatus+"; StartMiles: "+data[0].startMileage);
        await setCustomerName(data[0].customerName);
        await setJobSite(data[0].jboSite);
        await setStartMileage(data[0].startMileage);
        await setEndMileage(data[0].endMileage);
        await setStartTime(data[0].startTime);
        await setEndTime(data[0].endTime);
        await setDesc(data[0].desc);
        await setDerivedMiles(data[0].totalMiles);
        await setCreateDt(data[0].createDt);
        await setMgrId(data[0].mgrId);
        await setAgentId(data[0].agentId);
        console.log("Start Mileage: "+startMileage+"; AgentId :"+agentId);
     })
    },[]);

  const setMiles= () => {
    if(startMileage == 0 || endMileage == 0)
    {
      setDerivedMiles(0);    
    }else{
  tempmiles=parseInt(endMileage)-parseInt(startMileage)
  console.log("Miles => "+ miles);
  setDerivedMiles(tempmiles);
    }
  setConfirmation(!confirmMsg);
  
};




const getTotalHrs= () => { 
  if(startTime == new Date("9999-12-31") || endTime== new Date("9999-12-31"))
  {
    return 0;
  }else
  {
   console.log("endTime-startTime => "+ (new Date(endTime))-(new Date(startTime) ));
    return Math.ceil((new Date(endTime)-new Date(startTime))/36e5);
  }
}
const createNewTicket=async () => {
  console.log("Updating ticket");
  //let ticketID=Date.now()
  /* if(startTime=='')
  {
    setStartTime(new Date("9999-12-31"));
  }

  if(endTime=='')
  {
    setEndTime(new Date("9999-12-31"));
    console.log(new Date("9999-12-31"));
    console.log("end => "+endTime);
  }

  console.log("Ticket ID => "+ticketID);
  if(isIsoDate(startTime))
  {
    console.log("startTime :"+ startTime);
  }else{
    console.log("startTime :"+ startTime.toISOString());
    setStartTime(startTime.toISOString());
  }
  if(isIsoDate(startTime))
  {
  console.log("End time => "+endTime);
  }else{
    console.log("End time => "+endTime.toISOString());
    setEndTime(endTime.toISOString());
  } */
  console.log("startTime "+startTime);
  console.log("endTiem : "+ endTime);
  console.log("startMileage:"+startMileage);
  console.log("endMileage:"+endMileage);
  console.log("customerName:"+customerName);
  console.log("jboSite: "+jobSite.toString());
  console.log("totalMiles:"+ miles);
  console.log("totalHrs:"+ getTotalHrs());
  console.log("agentId:" +agentId);
  console.log("createDt :"+ createDt);
  console.log("desc: "+ desc);
  console.log("agentId "+ agentId);
  

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ ticketID: ticketID, startTime: startTime, endTime:endTime.toISOString(), 
      startMileage:startMileage,endMileage:endMileage,customerName:customerName,   
      jboSite: jobSite.toString(), totalMiles: miles, totalHrs: getTotalHrs(), ticketStatus: "COMPLETED",  agentId: agentId,
      mgrId: mgrId, createDt : createDt, desc: desc
    })
    
  
  }; 

  console.log("request options => "+requestOptions);
  const data=await services.createTicket(requestOptions);
  console.log("Ticket data response=> "+data);
  return data;
}

const showStartDatePicker = () =>
{
    setStartTime(new Date());
    setShowDatePicker(!showDatePicker);
}

const showEndDatePicker = () =>
{
    setEndTime(new Date());
    setShowEndTimePicker(!showEndTimePicker);

}

const handleSubmit=async () => {
  console.log("inside handle submit => ");  
 const data=await createNewTicket();
 console.log("Data inside submit => "+ JSON.stringify(data)); 
}

function isIsoDate(str) {
    console.log("Checking time "+str);
    const d = new Date(str);
    console.log("Date1" + d);
    console.log("Date" + new Date("2023-01-26T04:55:18.000"));
    
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
    //const d = new Date(str); 
    console.log("Date =>"+ d);
    return d instanceof Date && !isNaN(d) && d.toISOString()===str; // valid date 
  }

  return (
    <>
      <View style={[styles.header,{ flex: 1 }]}>
        <Text style={{color:"white"}}>New Ticket - {new Date().getDate()}{currentDay}</Text>
      </View>

      <View style={{ flex: 0.3  }}></View>
      
      <View style={{flex: 12 }}>
      { !confirmMsg &&
      <ScrollView style={[{flex: 12},styles.scrollView]}>

        <View style={styles.elementContainer}>
        <Text style={styles.baseText}>Customer</Text>
        <TextInput
            style={styles.input}
            value={customerName}
            onChangeText={(text) => setCustomerName(text)}
        />
        </View>

        <View><Text> {'\n'}</Text></View>

        <View style={styles.elementContainer}>
        <Text style={styles.baseText}>Job Site</Text>
        <TextInput
            style={styles.input}
            value={jobSite}
            onChangeText={(text) => setJobSite(text)}
        />
        </View>
        <View><Text> {'\n'}</Text></View>

        <View style={styles.elementContainer}>
        <Text style={styles.baseText}>Start Mileage</Text>
            <TextInput
            style={styles.input}
            value={startMileage}
            onChangeText={(text) => setStartMileage(text)}
            />
            </View>
            <View><Text> {'\n'}</Text></View>
            <View style={styles.elementContainer}>
        <Text style={styles.baseText}>End Mileage</Text>
        <TextInput
            style={styles.input}
            value={endMileage}
            onChangeText={(text) => setEndMileage(text)}
        /> 
        </View>

        <View><Text> {'\n'}</Text></View>
    
    <View style={styles.elementContainer}>
    <View style={styles.row}>
        <Text style={styles.baseText}>Start Time</Text>
        <TextInput
            style={styles.input}
            value={startTime.toString()}
        />
        <TouchableOpacity onPress={() => showStartDatePicker()}>
            <Image
            source={require('../assets/calendar-green.png')}
            style={{marginTop: 15, height: 30, width: 30}}
            /> 
        </TouchableOpacity>
      </View>
      </View> 

      <View><Text> {'\n'}</Text></View>
      
      <View style={styles.row}>
        <Text style={styles.baseText}>End Time</Text>
        <TextInput
            style={styles.input}
            value={endTime.toString()}
        />
        <TouchableOpacity onPress={() => showEndDatePicker()}>
            <Image
            source={require('../assets/calendar-green.png')}
            style={{marginTop: 15, height: 30, width: 30}}
            /> 
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showDatePicker}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setConfirmation(!showDatePicker);
        }}>
        <View style={styles.centeredView}>
          {/* <View style={styles.modalView}> */}
                {/* <DatePickerIOS
                date={startTime}
                onDateChange={date => {setStartTime(date);
                //console.log(selectedDate.toString())
                                        }}
                />  */}

            {/* <DateTimePicker mode="time" 
                date={startTime}
                onDateChange={date => {setStartTime(date);}}/>

                <Button
                title="Done"
                onPress={() => setShowDatePicker(false)}/> */}

                <DateTimePicker mode="datetime" 
                    isVisible={showDatePicker}
                    onConfirm={date => {
                        setShowDatePicker(false);
                        setStartTime(date);
                        }}
                    onCancel={() => setShowDatePicker(false)}
                date={startTime}
                />
            {/* </View> */}
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showEndTimePicker}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setConfirmation(!showEndTimePicker);
        }}>
        <View style={styles.centeredView}>
          {/* <View style={styles.modalView}> */}
        
               {/*  <DatePickerIOS
                date={endTime}
                onDateChange={date => {setEndTime(date);
                //console.log(selectedDate.toString())
                                        }}
                />  */}

            <DateTimePicker mode="datetime" 
                    isVisible={showEndTimePicker}
                    onConfirm={date => {
                        setShowEndTimePicker(false);
                        setEndTime(date);
                    }}
                    onCancel={() => setShowEndTimePicker(false)}
                date={endTime}
                />
                {/* onDateChange={date => {setEndTime(date);}} */}
            {/* <Button
                title="Done"
                onPress={() => setShowEndTimePicker(false)}
            /> */}
            {/* </View> */}
        </View>
    </Modal>
      <Text style={styles.baseText}>Work Description</Text>
      <TextInput
        style={[styles.input, {height: 80}]}
        value={desc}
        onChangeText={(text) => setDesc(text)}
      />     
        </ScrollView>
}

<Modal
        animationType="slide"
        transparent={true}
        visible={confirmMsg}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setConfirmation(!confirmMsg);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* <Text style={styles.modalText}>Hello World!</Text> */}
            {/* <Card containerStyle={styles.row} borderRadius={25}> */}
            <Text style={{color:"black",alignItems: 'center',justifyContent: 'center', fontSize:18}}>Please verify before Submitting the data </Text>
            <View><Text> {'\n'}</Text></View>
            <Text style={{color:"black"}}>Customer: {customerName}</Text>
            <View><Text> {'\n'}</Text></View>
            <Text style={{color:"black"}}>Job Site: {jobSite}</Text>
            <View><Text> {'\n'}</Text></View>
            <Text style={{color:"black"}}>Start Mileage: {startMileage}</Text>
            <View><Text> {'\n'}</Text></View>
            <Text style={{color:"black"}}>End Mileage: {endMileage}</Text>
            <View><Text> {'\n'}</Text></View>
            <Text style={{color:"black"}}>Work Description: {desc}</Text>
            <View><Text> {'\n'}</Text></View>
             <Text style={{color:"black"}}>Total Miles: {miles}</Text> 
            <View><Text> {'\n'}</Text></View>
            <Text style={{color:"black"}}>Start Time: {startTime.toString()}</Text>
             <View><Text> {'\n'}</Text></View>
            <Text style={{color:"black"}}>End Time: {endTime.toString()}</Text>
        {/* </Card> */}
        <View><Text> {'\n'}</Text></View>
        <View style={[styles.buttonHolder]}>
                <Pressable
                style={[styles.mobdalbutton, styles.buttonClose]}
                onPress={async () => {
                    await handleSubmit();
                    setConfirmation(!confirmMsg);
                    navigation.navigate('Dashboard',{name:'Jake!'});
                    }}>
                <Text style={styles.textStyle}>Proceed</Text>
                </Pressable>

                <Pressable
                style={[styles.mobdalbutton, styles.buttonClose, {backgroundColor:"red" }]}
                onPress={() => { setConfirmation(!confirmMsg);
                //navigation.navigate('createTicket');
            }}>
                <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
            </View>    
          </View>
        </View>
      </Modal>

    </View>
    <View style={{ flex: 0.2  }}></View>
    <View style={{ flex: 1  }}>
    <View style={[styles.buttonHolder]}>


    <TouchableOpacity onPress={() => {
            //setConfirmation(!confirmMsg)
            navigation.navigate('Dashboard',{name:'Jake!'});
          }} 
          style={[styles.button, {backgroundColor:'red'}]}>
            <Text style={[styles.buttonText]}>Cancel</Text>
          </TouchableOpacity>

      <TouchableOpacity onPress={() => {
        //setConfirmation(!confirmMsg);
        setMiles();
        
      }} 
      style={[styles.button]}>
        <Text style={[styles.buttonText]}>Close</Text>
    </TouchableOpacity>
    </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#74B72E",
        //paddingLeft: 20,
        borderRadius: 10,
        //width:0,
        height: 36,
        //marginLeft: 150,
        alignItems:'center',
        justifyContent: 'center',
    alignContent: 'space-between',
    flexBasis: '45%'
        
    },
    buttonText: {
        color: "white",
        justifyContent: "center"
    
    },
    input: {
        flexDirection: 'row',
        flex:3,
        height: 40,
        margin:12,
        borderWidth: 1,
        padding: 12,
        justifyContent: 'space-around',
        backgroundColor: "white",
        borderRadius: 100
        //flex: 1,
      },
    
       baseText: {
        flexDirection: 'row',
        flex:1,
        fontFamily: "Cochin",
        margin: 10,
        color: "white",
        padding: 8,
        fontSize:12
      },
      scrollView: {
        flex:1,
        flexDirection:'column',
        marginHorizontal: 20,
        backgroundColor: "#7F7D9C",
        borderRadius: 25,
      },
      elementContainer: {
        flexDirection: 'row',
        height:40,
        borderRadius: 100,
        fontFamily: 'Cochin',
        fontSize: 14,
        justifyContent: 'space-around'
        
      },
      header: {
        flex: 1,
        flexDirection: 'column',
        alignSelf:'center',
        justifyContent: 'center',
        marginTop : 10,
        marginRight: 10,
        padding:6,
        backgroundColor: "#74B72E",
        borderRadius: 25,
        },
        row: {
            flexDirection: "row",
            flexWrap: "wrap",
            flex: 1,
            fontFamily: 'Cochin',
            fontSize: 20,
            backgroundColor: "#7F7D9C",
            color:"white"
          },
          buttonHolder:
          {
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignSelf:'center',
            justifyContent: 'space-between'
          },


        //   Modal styling
          centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 12,
          },
          modalView: {
            margin: 20,
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
            width: "80%",
            height: "80%"
          },
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
          },
          textStyle: {
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
          },
          modalText: {
            marginBottom: 15,
            textAlign: 'center',
          },

          //End of Modal Styles
});