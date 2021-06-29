import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  View,
  Text,
  StatusBar
} from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Movies from './Screens/Movies'
import Search from './Screens/Search'
import MyList from './Screens/MyList'
import TVShow from './Screens/TVShow'


import { Provider } from 'react-redux';

import Icon from 'react-native-vector-icons/Feather'
import { store } from './redux';

const Tab = createBottomTabNavigator()


function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName
          if (route.name === "Movies") {
            iconName = focused ? 'film' : 'film';
          } else if (route.name === "TV Show") {
            iconName = focused ? 'tv' : 'tv';
          } else if (route.name === "Search") {
            iconName = focused ? 'search' : 'search';
          } else if (route.name === "My List") {
            iconName = focused ? 'list' : 'list';
          }

          // return <Image source={require('./img/icon_home.png')} style={{backgroundColor:color}}/>
          return <Icon name={iconName} size={size} color={color} />
        }
      })}
      tabBarOptions={{
        activeTintColor: 'red',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Movies" component={Movies} />
      <Tab.Screen name="TV Show" component={TVShow} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="My List" component={MyList} />
    </Tab.Navigator>
  )
}

function HomeNavigation() {
  return (
    <Provider store={store}>
      <NavigationContainer >
        <TabRoutes />
      </NavigationContainer>
    </Provider>
  )
}


export default HomeNavigation