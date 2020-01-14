import React, {Component} from 'react';
import {Text, View, StyleSheet, Button, TouchableOpacity} from 'react-native';

import {connect} from 'react-redux';

import Icon from 'react-native-vector-icons/EvilIcons';
import {searchWork} from '../redux/actions';
import {bindActionCreators} from 'redux';


class Header extends Component {
  handleSearch = () => {
    this.props.searchWork();
  };

  render() {
    const {rWorks} = this.props;
    console.log('reduce', rWorks);
    return (
      <View style={styles.container}>
        <View style={{flex: 20}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 20,
            }}
          >
            
              <Text style={styles.textTitle}> Reminders</Text>
            <Text style={styles.textCount}>{rWorks.isCounter}</Text>
          </View>
          <View style={{flexDirection: 'row-reverse', paddingLeft: 10}}>
            <Text style={{color: '#ffffff', paddingRight: 10}}>Works</Text>
          </View>
          <View
            style={{
              flexDirection: 'row-reverse',
              alignItems: 'center',
              paddingRight: 10,
            }}
          >
            <Icon
              style={styles.iconComplete}
              name="search"
              onPress={this.handleSearch}
              size={50}
              color="#ffffff"
            ></Icon>
          </View>
        </View>
      </View>
    );
  }
}




const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#213F84',
  },
  textTitle: {
    fontSize: 37,
    color: '#ffffff',
    paddingLeft: 20,
    paddingTop: 50,
  },
  textCount: {
    fontSize: 35,
    color: '#ffffff',
    alignContent: 'flex-end',
    paddingRight: 20,
    paddingTop: 50,
  },
  separator: {
    backgroundColor: '#EAEDED',
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  iconComplete: {
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default connect(
  state => ({
    rWorks: state.works.works,
  }),
  dispatch =>
    bindActionCreators(
      {
        searchWork,
      },
      dispatch
    )
)(Header);
