import Header from './src/components/Header';
import Login from './src/components/Login';
import TodoInput from './src/components/TodoInput';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const MainNavigator = createStackNavigator(
  {
    TodoInput: {
      screen: TodoInput,
      // navigationOptions: {
      //   header: null,
      // },
    },
    LoginScreen: { 
      screen: Login,
      navigationOptions: {
        header:null,
      },
    },
  },
  {
    initialRouteName: 'LoginScreen',
  }
);

const AppContainer = createAppContainer(MainNavigator);

export default AppContainer;
