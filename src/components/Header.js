import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

import {connect} from 'react-redux';

class Header extends Component {
  render() {
    const { rWorks } = this.props;
    console.log('reduce', rWorks);
    return (
      <View style={styles.container}>
        <View style={{flex: 20}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.textTitle}> Reminders</Text>
            <Text style={styles.textCount}>{rWorks.isCounter}</Text>
          </View>
          <View style={{flexDirection: 'row-reverse', paddingLeft: 10}}>
            <Text style={{color: '#0994D0'}}>Works</Text>
          </View>
        </View>
        <View
          style={{
            flex: 5,
            backgroundColor: '#f5f5f5',
            justifyContent: 'flex-end',
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#f5f5f5',
  },
  textTitle: {
    fontSize: 35,
    color: '#0994D0',
    paddingLeft: 20,
    paddingTop: 30,
  },
  textCount: {
    fontSize: 35,
    color: '#0994D0',
    alignContent: 'flex-end',
    paddingRight: 20,
    paddingTop: 30,
  },
  separator: {
    backgroundColor: '#EAEDED',
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default connect(
  state => ({
    rWorks: state.works.works,
  }),
  null,
)(Header);
