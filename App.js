import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

import {Provider} from 'react-redux';

import TodoInput from './src/components/TodoInput';
import Header from './src/components/Header';

import store from './src/redux/store';


class App extends Component {


  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Header></Header>
          <TodoInput></TodoInput>
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
