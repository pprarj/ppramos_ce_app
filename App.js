import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import Home from './src/Home';
import Login from './src/Login';
import Logout from './src/Logout';
import Dashboard from './src/Dashboard';
import Barcode from './src/Barcode';
import Reduction from './src/Reduction';

const Browser = StackNavigator({
  Home: { screen: Home },
  Login: { screen: Login },
  Logout: { screen: Logout },
  Dashboard: { screen: Dashboard },
  Barcode: { screen: Barcode },
  Reduction: { screen: Reduction }
});

export default Browser;