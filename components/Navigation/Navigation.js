import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import QRcodeReader from '../../screens/QRcodeReader';
import Promotions from '../../screens/Promotions';

const Navigation = () => {

  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="white"
      labelStyle={{ fontSize: 12 }}
      style={{ backgroundColor: 'tomato' }}
      shifting
    >
      <Tab.Screen
        name="QR Code Reader"
        component={QRcodeReader}
        options={{
          tabBarLabel: 'QR Code Reader',
          tabBarColor: '#20B4BA',
          tabBarIcon: ({ color }) => (
            <Icon name="qrcode" size={26} color="white" />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Promotions}
        options={{
          tabBarLabel: 'Promotions',
          tabBarColor: '#ff99ff',
          tabBarIcon: ({ color }) => (
            <Icon name="tags" size={26} color="white" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default Navigation;