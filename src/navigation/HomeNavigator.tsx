import React from 'react';
import { createStackNavigator, StackCardInterpolationProps } from '@react-navigation/stack';
import {
  
  HOME, LOGIN, REGISTER
} from './routeNames';

import Login from '../screens/Login';
import Signup from '../screens/Signup';
import { connect } from 'react-redux';
import Home from '../screens/Home';




const screenOptions = {
  headerShown: false,
  gestureEnabled: false,
  cardShadowEnabled: false,
  cardStyleInterpolator: ({ current, next, inverted, layouts: { screen }, closing }: StackCardInterpolationProps) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [screen.width, 0],
            }),
          },
          {
            translateX: next ? next.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -screen.width],
            }) : 1,
          },
        ],
      },
    };
  }
}

const HomeStack = createStackNavigator();

const HomeNavigator = (props: any) => {
  
  return (
    props.isLoggedIn ? (
      <HomeStack.Navigator initialRouteName='Signup' screenOptions={screenOptions}>
        <HomeStack.Screen name={HOME} component={Home} />
      </HomeStack.Navigator>
    ) : (
      <HomeStack.Navigator initialRouteName='Signup' screenOptions={screenOptions}>
        <HomeStack.Screen name={LOGIN} component={Login} />
        <HomeStack.Screen name={REGISTER} component={Signup as any} />
      </HomeStack.Navigator>
    )
  );
};

const mapStateToProps = (state: any) => {
  return {
    isLoggedIn: state.authReducer.isLoggedIn,
  }
}

export default connect(mapStateToProps, null)(HomeNavigator);