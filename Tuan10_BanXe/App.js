import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './slices/store';

import LoginScreen from './screens/Screen1'; // Thêm màn hình đăng nhập
import Screen2 from './screens/Screen2';
import Screen3 from './screens/Screen3';
import admin from './screens/admin'; // Màn hình admin
import edit from './screens/editBike';
import add from './screens/addBike';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginScreen">
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{
              headerShown: false,
              cardStyle: {
                flex: 1,
              },
            }}
          />
          <Stack.Screen
            name="Screen2"
            component={Screen2}
            options={{
              headerShown: false,
              cardStyle: {
                flex: 1,
              },
            }}
          />
          <Stack.Screen
            name="Screen3"
            component={Screen3}
            options={{
              headerShown: false,
              cardStyle: {
                flex: 1,
              },
            }}
          />
          <Stack.Screen
            name="edit"
            component={edit}
            options={{
              headerShown: false,
              cardStyle: {
                flex: 1,
              },
            }}
          />
          <Stack.Screen
            name="add"
            component={add}
            options={{
              headerShown: false,
              cardStyle: {
                flex: 1,
              },
            }}
          />
          <Stack.Screen
            name="admin"
            component={admin}
            options={{
              headerShown: false,
              cardStyle: {
                flex: 1,
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
