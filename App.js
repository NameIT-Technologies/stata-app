import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

// You can import from local files
import AssetExample from './components/AssetExample';
import Login from './components/login';
import HomeScreen from './components/homeScreen';
import CreateTicket from './components/createTkt';
import TicketDtl from './components/ticketDtl';


// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Strata">
          <Stack.Screen 
            name="Strata"
            component={Login}
            />

        <Stack.Screen 
            name="Dashboard"
            component={HomeScreen}
            options={{name:'Jake!'}}
            />

            <Stack.Screen 
            name="createTicket"
            component={CreateTicket}
            />

            <Stack.Screen 
            name="ticketDtl"
            component={TicketDtl}
            />
        
        </Stack.Navigator>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    //paddingTop: Constants.statusBarHeight,
    paddingTop: 50,
    backgroundColor: '#ecf0f1',
    //padding: 2,
    margin: 0
  },
  paragraph: {
    margin: 0,
    height: 30,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#7f5ce3',
  },
});
