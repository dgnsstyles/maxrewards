import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// Screens
import HomeDashboard from '../screens/HomeDashboard';
import OffersList from '../screens/OffersList';
import OfferDetail from '../screens/OfferDetail';
import CardsList from '../screens/CardsList';
import CardDetail from '../screens/CardDetail';
import Insights from '../screens/Insights';
import Profile from '../screens/Profile';
import AuthLogin from '../screens/AuthLogin';
import AuthSignup from '../screens/AuthSignup';
import Subscription from '../screens/Subscription';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const HomeStack = createStackNavigator();
const OffersStack = createStackNavigator();
const CardsStack = createStackNavigator();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Dashboard" component={HomeDashboard} />
    </HomeStack.Navigator>
  );
}

function OffersStackNavigator() {
  return (
    <OffersStack.Navigator screenOptions={{ headerShown: false }}>
      <OffersStack.Screen name="OffersList" component={OffersList} />
      <OffersStack.Screen name="OfferDetail" component={OfferDetail} />
    </OffersStack.Navigator>
  );
}

function CardsStackNavigator() {
  return (
    <CardsStack.Navigator screenOptions={{ headerShown: false }}>
      <CardsStack.Screen name="CardsList" component={CardsList} />
      <CardsStack.Screen name="CardDetail" component={CardDetail} />
    </CardsStack.Navigator>
  );
}

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Offers') {
            iconName = focused ? 'pricetag' : 'pricetag-outline';
          } else if (route.name === 'Cards') {
            iconName = focused ? 'card' : 'card-outline';
          } else if (route.name === 'Insights') {
            iconName = focused ? 'analytics' : 'analytics-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#7c3aed',
        tabBarInactiveTintColor: '#9ca3af',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#f3f4f6',
          paddingBottom: 5,
          paddingTop: 5,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Offers" component={OffersStackNavigator} />
      <Tab.Screen name="Cards" component={CardsStackNavigator} />
      <Tab.Screen name="Insights" component={Insights} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const isAuthenticated = true; // This will be managed by auth store later

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="MainApp" component={MainTabNavigator} />
            <Stack.Screen name="Subscription" component={Subscription} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={AuthLogin} />
            <Stack.Screen name="Signup" component={AuthSignup} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}