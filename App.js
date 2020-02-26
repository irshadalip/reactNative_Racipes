import React from 'react';
import { Text, View, Image } from 'react-native';
import SAComponent from './pure_login/SAComponent'
import ListComponent from './pure_login/ListComponent'
import Login from './pure_login/Login';
import Profile from './pure_login/Profile';
import AddRecipe from './pure_login/AddRecipe';
import DetailRecipe from './pure_login/DetailRecipe';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import { createTabNavigator, createBottomTabNavigator } from 'react-navigation-tabs';
import MapViews from './pure_login/MapViews';
import { createStore } from 'redux';
import { Provider } from 'react-redux';



const navigatorTabbar = createBottomTabNavigator({

  List: {
    screen: ListComponent, navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Image style={{ height: 20, width: 20, tintColor: tintColor }} source={require('./images/icon/home.png')} ></Image>
      ),
      title: 'Home'
    }
  },
  Map: {
    screen: MapViews, navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Image style={{ height: 20, width: 20, tintColor: tintColor }} source={require('./images/icon/map_icon.png')} ></Image>
      ),
      title: 'Map'
    }
  },
  Profile: {
    screen: Profile, navigationOptions: {
      tabBarIcon: ({ tintColor }) => (

        <Image style={{ height: 20, width: 20, tintColor: tintColor }} source={require('./images/icon/profile.png')} ></Image>
      ),
      title: 'Profile'
    }
  },
},
  {
    tabBarOptions: {
      activeTintColor: 'rgba(24,108,224,1)',
    },
    navigationOptions: {
      headerShown: false
    }
  }
)

const navigationStack = createStackNavigator(
  {
    navigatorTabbar,
    Login: { screen: Login, navigationOptions: { headerShown: false } },
    List: { screen: ListComponent, navigationOptions: { headerShown: false } },
    scroll: { screen: SAComponent, navigationOptions: { headerShown: true } },
    Map: { screen: MapViews, navigationOptions: { headerShown: true } },
    Profile: { screen: Profile, navigationOptions: { headerShown: true } },
    AddRecipe: { screen: AddRecipe, navigationOptions: { headerShown: true } },
    DetailRecipe: { screen: DetailRecipe, navigationOptions: { headerShown: true } }
  },
  {
    tabBarPosition: 'bottom',
    // headerShown: false
  },

)

const navigate = createSwitchNavigator(
  {
    Login: {
      screen: Login, navigationOptions: { headerShown: false }

    },
    navigationStack
  }
)

//////////////////////////
const AppContainer = createAppContainer(navigate);

const initalSate = {
  token: '',
  imageUrl: ''
}
const reducer = (state = initalSate, action) => {
  switch (action.type) {
    case 'Token':
      return { ...state, token: action.token };
    case 'ImageUrl':
      return { ...state,imageUrl: action.imageUrl };
    default:
      return { ...state, token: action.token };
  }
}
const store = createStore(reducer)

export default function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}
// const App = createAppContainer(navigate);

// export default App;












console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
console.disableYellowBox = true;