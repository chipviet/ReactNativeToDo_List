import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Button} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {showAll, showCompleted, showUncompleted,deletedAllWork} from '../redux/actions';

class Filter extends Component {
  getStatus(status) {
    if (status === this.props.rWorks.filterStatus)
      return {color: '#0994D0', fontWeight: 'bold'};
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

  // handleDeleteAll = () => {
  //   this.props.deletedAllWork();
  // }

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
        
        {/* <TouchableOpacity onPress={() => this.handleDeleteAll()}>
          <Text style={this.getStatus('DELETE_ALL_WORKS')}> DELETE ALL</Text>
        </TouchableOpacity> */}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
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
