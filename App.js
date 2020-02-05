import React, {Component} from 'react';
import {Text, View, StyleSheet, Button, TouchableOpacity} from 'react-native';

import {Provider} from 'react-redux';

import TodoInput from './src/components/TodoInput';
import Header from './src/components/Header';
import Login from './src/components/Login';
import AppContainer from './navigator';

import configureStore from './src/redux/store';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const store = configureStore()

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
        <AppContainer></AppContainer>
        {/* <Header></Header>
        <TodoInput></TodoInput> */}
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;




