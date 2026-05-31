import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StoreScreen from './screens/StoreScreen';
import CartScreen from './screens/CartScreen';
import InventoryScreen from './screens/InventoryScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: '#0A0A0A', borderTopColor: '#3A0008' },
          tabBarActiveTintColor: '#E8001C',
          tabBarInactiveTintColor: '#606060',
          headerStyle: { backgroundColor: '#0A0A0A', borderBottomColor: '#3A0008' },
          headerTintColor: '#F0F0F0',
        }}>
        <Tab.Screen name="Tienda" component={StoreScreen} options={{tabBarIcon: ()=> '🏪'}} />
        <Tab.Screen name="Stock" component={InventoryScreen} options={{tabBarIcon: ()=> '📋'}} />
        <Tab.Screen name="Carrito" component={CartScreen} options={{tabBarIcon: ()=> '🛒'}} />
        <Tab.Screen name="Cuenta" component={ProfileScreen} options={{tabBarIcon: ()=> '👤'}} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
