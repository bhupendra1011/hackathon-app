/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Foundation, Ionicons, AntDesign, MaterialIcons, Feather, FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';



import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';

import TabTwoScreen from '../screens/UploadIdeaScreen';
import UnderConstructionScreen from '../screens/UnderConstructionScreem';
import { BottomTabParamList, HomeParamList, UploadParamList } from '../types';
import UploadIdeaScreen from '../screens/UploadIdeaScreen';
import CustomHeader from '../components/CustomHeader';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint, labelPosition: "below-icon" }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={24} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Explore"
        component={UnderConstructionScreen} //TODO : aplha 1.0
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="compass-outline" size={24} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Idea"
        component={UploadNavigator}
        options={{
          tabBarIcon: ({ color }) => <AntDesign name="pluscircleo" size={24} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Scores"
        component={UnderConstructionScreen} //TODO : aplha 1.0
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="podium-outline" size={24} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={UnderConstructionScreen} //TODO : aplha 1.0
        options={{
          tabBarIcon: ({ color }) => <FontAwesome name="user-o" size={24} color={color} />,
        }}
      />

    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<HomeParamList>();


function HomeNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{
      header: () => <CustomHeader enableSearch={true} />
    }}>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
      />
      <HomeStack.Screen
        name="DetailScreen"
        component={DetailScreen}
      />
    </HomeStack.Navigator>
  );
}

const UploadStack = createStackNavigator<UploadParamList>();

function UploadNavigator() {
  return (
    <UploadStack.Navigator screenOptions={{
      header: () => <CustomHeader enableSearch={false} />
    }}>
      <UploadStack.Screen
        name="UploadScreen"
        component={UploadIdeaScreen}
      />
    </UploadStack.Navigator>
  );
}
