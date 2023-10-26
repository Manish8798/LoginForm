import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Form1 from './src/screens/Form1';
import Form2 from './src/screens/Form2';
import Form3 from './src/screens/Form3';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Form1" component={Form1} />
        <Stack.Screen name="Form2" component={Form2} />
        <Stack.Screen name="Form3" component={Form3} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
