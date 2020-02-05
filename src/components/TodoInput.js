import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  FlatList,
  SafeAreaView,
  Button,
  TouchableOpacity,
} from 'react-native';

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
  searchingWork,
  searchWork,
} from '../redux/actions';
import Filter from './Filter';
import {bindActionCreators} from 'redux';
import {getVisibleWorks} from '../selectors/workSelectors';
import axios from 'axios';
import moment from 'moment';

class TodoInput extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title : 'Reminders',
      headerStyle: {
        backgroundColor: '#213F84',
      },
      headerTintColor: '#ffffff',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 25
      },

      headerRight: () => (
        <Icon
          name="search"
          onPress={navigation.getParam('handleSearch')}
          size={25}
          color="#ffffff"
        ></Icon>
      ),
      headerLeft: () => (
        <Button
          onPress={() => navigation.navigate('LoginScreen')}
          title="Back"
          color="#fff"
        />
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      uid: 0,
      title: '',
      isCompleted: false,
      works: '',
    };
  }

  componentDidMount() {
    console.log("AAAA",this.props.rWorks.user.id);
    this.props.fetchDataWork(this.props.rWorks.page,this.props.rWorks.user.id);
    this.props.navigation.setParams({handleSearch: this.handleSearch});
  }

  handleGetMoreItem = () => {
    let result = 1;
    if (this.props.rWorks.page !== this.props.rWorks.totalPage) {
      result = this.props.rWorks.page + 1;
    } else return (result = this.props.rWorks.totalPage);
    this.props.fetchDataWork(result);
  };

  handlePost = () => {
    const {id, title, isCompleted} = this.state;
    const uid = this.props.fetchUser
    this.props.postDataWork(id, title, isCompleted);
    this.setState({
      title: '',
    });
  };

  handleDelete = id => () => {
    this.props.deleteDataWork(id);
  };

  handleComplete = (id, risCompleted) => () => {
    this.props.completeDataWork(id, risCompleted);
  };

  handleSearching = () => {
    const {title} = this.state;
    this.props.searchingWork(1, 'true', title);
    this.setState({
      title: '',
    });
  };

  handleSearch = () => {
    console.log('Vo day');
    this.props.searchWork();
  };

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
        ]}
      >
        <View style={styles.separator}></View>
        <View style={styles.listView}>
          <View style={styles.showItem}>
            <Icon
              style={styles.iconComplete}
              onPress={this.handleComplete(item._id, item.isCompleted)}
              name={item.isCompleted ? 'checkbox-active' : 'checkbox-passive'}
              size={20}
              color="green"
            ></Icon>
            <Text style={styles.txtWorks}>{item.title}</Text>
          </View>
          <View style={styles.showTime}>
            <Text style={styles.txtTime}>
              {moment(item.date).format('HH:mm')}
            </Text>
          </View>
        </View>
      </Swipeout>
    );
  };

  render() {
    const {rWorks} = this.props;
    console.log('rWorks',rWorks.user.id);
    return (
      <SafeAreaView style={{flex: 6}}>
        <View style={{flex: 0.13, backgroundColor: '#213F84'}}>
          <View style={styles.textInputComponent}>
            {rWorks.isSearching ? (
              <TextInput
                placeholder="What do you want to search ?"
                value={this.state.title}
                style={styles.inputViewer}
                onChangeText={text => this.setState({title: text})}
                onSubmitEditing={this.handleSearching}
              ></TextInput>
            ) : (
              <TextInput
                ref="textInput"
                style={styles.inputViewer}
                placeholder="Enter your works"
                value={this.state.title}
                onChangeText={text => this.setState({title: text})}
                onSubmitEditing={this.handlePost}
              />
            )}
          </View>
        </View>
        <View style={{flex: 1, backgroundColor: '#ffffff'}}>
          <FlatList
            data={
              rWorks.isSearching
                ? rWorks.resultSearching
                : this.props.rVisibitilityWorks
            }
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={0.1}
            onEndReached={this.handleGetMoreItem}
          ></FlatList>
        </View>
        <Filter></Filter>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputComponent: {
    justifyContent: 'center',
    margin: 10,
    backgroundColor: '#213F84',
  },
  inputViewer: {
    height: 50,
    borderWidth: 2,
    borderColor: '#FF5722',
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#ffffff',
  },
  txtInput: {
    height: 40,
    margin: 10,
    paddingHorizontal: 10,
    fontSize: 15,
  },
  txtTime: {
    height: 35,
    backgroundColor: '#ffffff',
    margin: 10,
    paddingHorizontal: 10,
    paddingTop: 10,
    fontSize: 15,
    //alignSelf: 'flex-end',
  },
  listView: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  showItem: {
    backgroundColor: '#ffffff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  showTime: {
    backgroundColor: '#ffffff',
    //justifyContent:'flex-end',
    flexDirection: 'row-reverse',
  },
  swipeoutSize: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconComplete: {
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 10,
  },
  separator: {
    backgroundColor: '#EAEDED',
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  textTitle: {
    fontSize: 37,
    color: '#ffffff',
    paddingLeft: 20,
    paddingTop: 50,
  },
  txtWorks: {
    height: 40,
    backgroundColor: '#ffffff',
    margin: 10,
    paddingHorizontal: 10,
    paddingTop: 10,
    fontSize: 15,
  },
  headerStyle: {
    backgroundColor: '#213F84',
  },
});

export default connect(
  state => (
    {
      rWorks: state.works.works,
      rVisibitilityWorks: getVisibleWorks(state),
    }
  ),
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
        searchingWork,
        searchWork,

      },
      dispatch
    )
)(TodoInput);
