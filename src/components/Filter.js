import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Button} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {showAll, showCompleted, showUncompleted,deletedAllWork} from '../redux/actions';

class Filter extends Component {
  getStatus(status) {
    if (status === this.props.rWorks.filterStatus)
      return {color: '#213F84', fontWeight: 'bold'};
    return styles.txtFilter;
  }

  handleShowAll = () => {
    this.props.showAll();
  };

  handleShowCompleted = () => {
    this.props.showCompleted();
  };

  handleShowUncompleted = () => {
    this.props.showUncompleted();
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.handleShowAll()}>
          <Text style={this.getStatus('SHOW_ALL')}> ALL</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.handleShowCompleted()}>
          <Text style={this.getStatus('SHOW_COMPLETED')}> COMPLETED</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.handleShowUncompleted()}>
          <Text style={this.getStatus('SHOW_UNCOMPLETED')}> UNCOMPLETED</Text>
        </TouchableOpacity>
  
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height:60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor:'#8C919E',
  },
  txtFilter: {
    color: '#000000',
  },
});

export default connect(
  (state) => ({
    rWorks: state.works.works,
  }),
  (dispatch) =>
    bindActionCreators(
      {
        showAll,
        showCompleted,
        showUncompleted,
        deletedAllWork,
      },
      dispatch,
    ),
)(Filter);
