import React, { useState }  from 'react';
import { View, TextInput,Text,TimePicker,SafeAreaView,TouchableOpacity, Image, Button,
    StyleSheet, ScrollView, StatusBar, Animated, Modal, Pressable, Platform,Alert,KeyboardAvoidingView,ImageBackground } from "react-native";
    import { Card } from '@rneui/themed';
    import { NavigationContainer } from '@react-navigation/native';
    import { createNativeStackNavigator } from '@react-navigation/native-stack';
    import services from '../services/strata-api';
    //import DateTimePicker from '@react-native-community/datetimepicker';
    import DateTimePicker from "react-native-modal-datetime-picker";
    


export default function CreateTicket({route, navigation}) {

    const weekday = ["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];
    var currentDay = weekday[new Date().getDay()]; //To get the Current Date

    const [customerName, setCustomerName] = useState('');
  const [jobSite, setJobSite] = useState('');
  const [startMileage, setStartMileage] = useState(0);
  const [endMileage, setEndMileage] = useState(0);
  const [confirmMsg,setConfirmation]=useState(false); 
  const [alertmsg,setAlertmsg]=useState(false); 
  
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startTime, setStartTime] = useState(new Date(Date.now()));
  const [endTime, setEndTime] = useState(new Date("9999-12-31"));
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [desc, setDesc] = useState('');
  const [miles, setDerivedMiles] = useState(0);

  

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

const {agentId,name} = route.params;




const getTotalHrs= () => { 
  if(startTime == new Date("9999-12-31") || endTime== new Date("9999-12-31"))
  {
    return 0;
  }else
  {
    return Math.ceil((endTime-startTime)/36e5);
  }
}
const createNewTicket=async () => {
  console.log("Creating new ticket");
  let ticketID=Date.now()
  if(startTime=='')
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
  console.log("startTime :"+ startTime.toISOString());
  console.log("End time => "+endTime.toISOString());
  console.log("startMileage:"+startMileage);
  console.log("endMileage:"+endMileage);
  console.log("customerName:"+customerName);
  console.log("jboSite: "+jobSite.toString());
  console.log("totalMiles:"+ miles);
  console.log("totalHrs:"+ getTotalHrs());
  console.log("agentId:" +agentId);
  console.log("createDt :"+ new Date(Date.now()).toISOString());
  console.log("desc: "+ desc);
  

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ ticketID: ticketID, startTime: startTime.toISOString(), endTime:endTime.toISOString(), 
      startMileage:startMileage,endMileage:endMileage,customerName:customerName,   
      jboSite: jobSite.toString(), totalMiles: miles, totalHrs: getTotalHrs(), ticketStatus: "NEW",  agentId: agentId,
      mgrId: "", createDt : new Date(Date.now()).toISOString(), desc: desc
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

React.useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
    
        // Prevent default behavior of leaving the screen
        e.preventDefault();

        // Prompt the user before leaving the screen
        Alert.alert(
          'Discard changes?',
          'You have unsaved changes. Are you sure to discard them and leave the screen?',
          [
            { text: "Don't leave", style: 'cancel', onPress: () => {
            // this.props.navigation.navigate("createTicket",{agentId: agentId, name: name});
              
            } },
            {
              text: 'Discard',
              style: 'destructive',
              // If the user confirmed, then we dispatch the action we blocked earlier
              // This will continue the action that had triggered the removal of the screen
              onPress: () => navigation.dispatch(e.data.action),
            },
          ]
        );
      }),
    [navigation]
  );


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

  return (
    <>
      <View style={[styles.header,{ flex: 1, alignSelf:'left',height:36,position:'absolute',left:40 }]}>
        <Text style={{color:"white"}}>New Ticket - {new Date().getDate()}{currentDay}</Text>
      </View>

      <View style={{ flex: 0.3  }}></View>
      
      <View style={{flex: 12 }}>
    
      <ScrollView style={[{flex: 12},styles.scrollView,[{paddingTop:30}]]}>

        <View style={styles.elementContainer}>
        <Text style={styles.baseTextcust}>Customer</Text>
        <TextInput
            style={styles.input}
            value={customerName}
            onChangeText={(text) => setCustomerName(text)}
        />
        </View>

        <View><Text style={[ {height: 12}]}> {'\n'}</Text></View>

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
            <View><Text style={[ {height: 12}]}> {'\n'}</Text></View>

    <View style={styles.elementContainer}>
    <View style={styles.row}>
        <Text style={styles.baseText}>Start Time</Text>
        <TextInput
            style={styles.input}
            value={startTime.toLocaleTimeString()}
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

      <Text style={styles.baseText}>Work Description</Text>
      <TextInput
        style={[styles.inputdesc, {height: 80}]}
        value={desc}
        onChangeText={(text) => setDesc(text)}
      />     
      <View><Text> {'\n'}</Text></View>



      <Modal
        animationType="slide"
        transparent={true}
        visible={showDatePicker}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setConfirmation(!showDatePicker);
        }}>
        <View style={styles.centeredView}>
        <DateTimePicker mode="time" 
                    isVisible={showDatePicker}
                    onConfirm={date => {
                        setShowDatePicker(false);
                        setStartTime(date);
                        }}
                    onCancel={() => setShowDatePicker(false)}
                date={startTime}
                />
          {/* <View style={styles.modalView}>
                <DatePickerIOS
                date={startTime}
                onDateChange={date => {setStartTime(date);
                //console.log(selectedDate.toString())
                                        }}
                />  

                <RNDateTimePicker mode="time" 
                date={startTime}
                onDateChange={date => {setStartTime(date);}}/>

                <Button
                title="Done"
                onPress={() => setShowDatePicker(false)}/>
            </View>*/}
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

        <DateTimePicker mode="time" 
                    isVisible={showEndTimePicker}
                    onConfirm={date => {
                        setShowEndTimePicker(false);
                        setEndTime(date);
                    }}
                    onCancel={() => setShowEndTimePicker(false)}
                date={endTime}
                />
         {/* <View style={styles.modalView}>
          
               <DatePickerIOS
              date={endTime}
              onDateChange={date => {setEndTime(date);
              //console.log(selectedDate.toString())
                                      }}
              />  

          <RNDateTimePicker mode="time" 
                date={endTime}
                onDateChange={date => {setEndTime(date);}}/>
          <Button
              title="Done"
              onPress={() => setShowEndTimePicker(false)}
          />  
            </View>*/}
        </View>
    </Modal>

        </ScrollView>


        {/* <BlurView
          style={styles.absolute}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
        /> */}

<Modal
        animationType="slide"
        transparent={true}
        visible={confirmMsg}
        presentationStyle="pageSheet"
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
            <Text style={{color:"black"}}>Work Description: {desc}</Text>
            <View><Text> {'\n'}</Text></View>
            <Text style={{color:"black"}}>Start Time: {startTime.toString()}</Text>
             <View><Text> {'\n'}</Text></View>
           
            <Text style={{color:"black"}}>End Mileage: {endMileage}</Text>
            <View><Text> {'\n'}</Text></View>
           
             <Text style={{color:"black"}}>Total Miles: {miles}</Text> 
            <View><Text> {'\n'}</Text></View>
            <Text style={{color:"black"}}>End Time: {endTime.toString()}</Text>
        {/* </Card> */}
        <View><Text> {'\n'}</Text></View>
        <View style={[styles.buttonHolder]}>
                

                <Pressable
                style={[styles.mobdalbutton, styles.buttonClose, {backgroundColor:"red" }]}
                onPress={() => { setConfirmation(!confirmMsg);
                //navigation.navigate('createTicket');
            }}>
                <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
                <Pressable
                style={[styles.mobdalbutton, styles.buttonClose]}
                onPress={async () => {
                    await handleSubmit();
                    setConfirmation(!confirmMsg);
                    navigation.navigate('Dashboard',{name:name, userId:agentId });
                    }}>
                <Text style={styles.textStyle}>Proceed</Text>
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
        //setConfirmation(!confirmMsg);
        setMiles();
        
      }} 
      style={[styles.button]}>
        <Text style={[styles.buttonText]}>Submit</Text>
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
        borderRadius: 10,
        borderWidth:0,
     //   shadowColor: 'black',
        
     // shadowOffset: {width: 5, height: 5},
     // shadowOpacity: 0.5,
     // shadowRadius: -5,
     // elevation:3
        //flex: 1,
      },
    inputdesc: {
        flexDirection: 'row',
        flex:3,
        height: 40,
        margin:12,
        borderWidth: 1,
        padding: 12,
        paddingTop:6,
        justifyContent: 'space-around',
        backgroundColor: "white",
        borderRadius: 20,
        borderWidth:0,
     //   shadowColor: 'black',
        
     // shadowOffset: {width: 5, height: 5},
     // shadowOpacity: 0.5,
     // shadowRadius: -5,
     // elevation:3
        //flex: 1,
      },
    
       baseText: {
        flexDirection: 'row',
        flex:1,
        fontFamily: "Cochin",
        margin: 1,
        color: "white",
        padding: 8,
        fontSize:16
      },
       baseTextcust: {
        flexDirection: 'row',
        flex:1,
        fontFamily: "Cochin",
        margin: 1,
        color: "white",
        padding: 8,
        fontSize:16,height:'100%'
      },
      scrollView: {
        flex:1,
        flexDirection:'column',
        marginHorizontal: 20,
        backgroundColor: "#485066",
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

        height: 36,
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
            padding:12,
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
            padding: 20,
            //alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            width: "60%",
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
          absolute: {
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
          }

          //End of Modal Styles
});