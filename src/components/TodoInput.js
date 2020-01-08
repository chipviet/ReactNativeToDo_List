import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput, FlatList} from 'react-native';

import Icon from 'react-native-vector-icons/Fontisto';
import Swipeout from 'react-native-swipeout';
import {connect} from 'react-redux';

import {
  addWork,
  deleteWork,
  completeWork,
  editWork,
  fetchDataWork,
  postDataWork,
  deleteDataWork,
  completeDataWork,
} from '../redux/actions';
import Filter from './Filter';
import {bindActionCreators} from 'redux';
import {getVisibleWorks} from '../selectors/workSelectors';
import axios from 'axios';

class TodoInput extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      title: '',
      isCompleted: false,
      works: '',
    };
  }

  componentDidMount() {
    this.props.fetchDataWork(this.props.rWorks.page);
  }


  handleGetMoreItem = () => {
    let result = 0;
    if (this.props.rWorks.page !== this.props.rWorks.totalPage) {
      result = this.props.rWorks.page + 1;
    }
    this.props.fetchDataWork(result);
  }

  handlePost = () => {
    const {id, title, isCompleted} = this.state;
    this.props.postDataWork(id, title, isCompleted);
    this.setState({
      title: '',
    });
  };

  handleDelete = id => () => {
    this.props.deleteDataWork(id);
  };

  handleComplete = (id, risCompleted) => () => {
    this.props.completeDataWork(id,risCompleted);
  }

  renderItem = ({item}) => {
    return (
      <Swipeout
        autoClose={true}
        onOpen={this._onOpen}
        onClose={this._onClose}
        rowId={this.props.index}
        sextionId={1}
        right={[
          {
            onPress: this.handleDelete(item._id),
            backgroundColor: 'red',
            component: (
              <View style={styles.swipeoutSize}>
                <Text> Delete</Text>
              </View>
            ),
          },
          {
            onPress: () => {
              this.handleEdit(item.id, item.title);
            },
            backgrounColor: '#2ECC71',
            component: (
              <View style={styles.swipeoutSize}>
                <Text>Edit</Text>
              </View>
            ),
          },
        ]}>
        <View style={styles.separator} />
        <View style={styles.listView}>
          <Text style={styles.txtWorks}>{item.title}</Text>
          <Icon
            style={styles.iconComplete}
            onPress={this.handleComplete(item._id, item.isCompleted)}
            name={item.isCompleted ? 'checkbox-active' : 'checkbox-passive'}
            size={20}
            color="green"></Icon>
        </View>
        <View style={styles.separator} />
      </Swipeout>
    );
  };

  render() {
    const {works, title} = this.state;
    const { rWorks } = this.props;
    console.log('rWorks',rWorks);
    return (
      <View style={{flex: 6}}>
        <View style={{flex: 1, backgroundColor: '#ffffff'}}>
          <View style={styles.separator} />
          <TextInput
            ref="textInput"
            style={styles.txtInput}
            placeholder="Enter your works"
            value={this.state.title}
            onChangeText={text => this.setState({title: text})}
            onSubmitEditing={this.handlePost}
          />
          <View style={styles.separator} />
          <FlatList
             data={this.props.rVisibitilityWorks}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={0.1}
            onEndReached={this.handleGetMoreItem }
          ></FlatList>
        </View>
        <Filter></Filter>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtInput: {
    height: 40,
    backgroundColor: '#f5f5f5',
    margin: 10,
    paddingHorizontal: 10,
    fontSize: 15,
  },
  listView: {
    backgroundColor: '#f5f5f5',
    justifyContent: 'flex-end',
    flexDirection: 'row-reverse',
  },
  swipeoutSize: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconComplete: {
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  separator: {
    backgroundColor: '#EAEDED',
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  txtWorks: {
    height: 40,
    backgroundColor: '#f5f5f5',
    margin: 10,
    paddingHorizontal: 10,
    paddingTop: 10,
    fontSize: 15,
  },
});

export default connect(
  state => (console.log("state",state),{
      rWorks: state.works.works,
    rVisibitilityWorks: getVisibleWorks(state),
  }),
  dispatch =>
    bindActionCreators(
      {
        addWork,
        deleteWork,
        completeWork,
        editWork,
        fetchDataWork,
        postDataWork,
        deleteDataWork,
        completeDataWork,
      },
      dispatch,
    ),
)(TodoInput);
