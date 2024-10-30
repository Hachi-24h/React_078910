import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import store from './src/store';
import Screen1 from './Screen/screen1';
import Screen2 from './Screen/screen2';
import Screen3 from './Screen/screen3';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Screen1">
          <Stack.Screen name="Screen1" component={Screen1} options={{ title: 'Manage Your Task' }} />
          <Stack.Screen name="Screen2" component={Screen2} options={{ title: 'Your Tasks' }} />
          <Stack.Screen name="Screen3" component={Screen3} options={{ title: 'Add/Edit Job' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
