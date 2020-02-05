import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  TextInput,
} from 'react-native';
import {Register,Login} from '../redux/actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {Button} from 'react-native-elements';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconGoogle from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';

class Introduction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true,
      username: '',
      email: '',
      password: '',
    };
  }

  // componentDidMount(){
  //   this.props.Login(null,null);
  // }
  handleUserStatus = () => {
    this.setState({
      isLogin: !this.state.isLogin,
    });
  };

  handleSignUp = () => {
    const {username, email, password} = this.state;
    this.props.Register(username, email, password).then(() => {
      const { rWorks } = this.props;
      if (rWorks.user.status === 'success') {
        //this.props.navigation.navigate('TodoInput')
      }
    })
    this.setState({
      username: '',
      email: '',
      password: '',
    });
  };

  handleLogin = () => {
    const {username,password} = this.state;
    this.props.Login(username,password).then(()=> {
      const { rWorks } = this.props;
      if (rWorks.user.status === 'success') {
        //this.props.navigation.navigate('TodoInput')
        console.log("Dangnhap thanh cong");
      }
    })
    
    // if(rWorks.user.result.data.data.message === 'Successfully'){
    //   this.props.navigation.navigate('TodoInput')
    //   console.log("Vaoday");
    // }
    this.setState({
      username:'',
      password:'',
    })
  }
  render() {
    const { rWorks } = this.props;
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('../assets/Ngan4.jpg')}
          style={{width: '100%', height: '100%'}}
        >
          <View style={{flex: 1.24}}>
            <View style={styles.imageLogoStyle}>
              <Image
                style={{width: 160, height: 160}}
                source={require('../assets/logo.png')}
              ></Image>

              <Text style={styles.titleTxtStyle}></Text>
            </View>
          </View>

          <View style={[styles.importBoxStyle, {flex: 2}]}>
            <View style={styles.backgroundFrameInput}>
              <View style={[styles.integrateLoginForm]}>
                <Button
                  title="Sign in"
                  type={this.state.isLogin ? 'solid' : 'outline'}
                  titleStyle={this.state.isLogin ? '' : {color: '#E0558A'}}
                  buttonStyle={
                    this.state.isLogin ? '' : {borderColor: '#E0558A'}
                  }
                  //containerStyle={{ borderColor: 'red', backgroundColor: 'red' }}
                  style={styles.loginBtnStyle}
                  onPress={this.handleUserStatus}
                ></Button>

                <Button
                  title="Sign up"
                  type={this.state.isLogin ? 'outline' : 'solid'}
                  buttonStyle={
                    this.state.isLogin ? '' : {backgroundColor: '#E0558A'}
                  }
                  style={styles.loginBtnStyle}
                  onPress={this.handleUserStatus}
                ></Button>
              </View>

              <View style={styles.loginFormStyle}>
                <TextInput
                  value={this.state.username}
                  style={styles.inputViewer}
                  placeholder="Username"
                  onChangeText={text => this.setState({username: text})}
                ></TextInput>

                {this.state.isLogin ? null : (
                  <TextInput
                    value={this.state.email}
                    style={[styles.inputViewer]}
                    placeholder="Email"
                    onChangeText={text => this.setState({email: text})}
                  ></TextInput>
                )}

                <TextInput
                  value={this.state.password}
                  secureTextEntry={true}
                  style={[styles.inputViewer]}
                  placeholder="Password"
                  onChangeText={text => this.setState({password: text})}
                ></TextInput>
              </View>
              <View style={styles.btnLoginForm}>
                {this.state.isLogin ? (
                  <Button
                    title="Sign in"
                    type="solid"
                    buttonStyle={{borderRadius: 20}}
                    style={styles.loginBtnStyle}
                    //onPress={() => this.props.navigation.navigate('TodoInput')}
                    onPress= {this.handleLogin}
                  ></Button>
                ) : (
                  <Button
                    title="Sign up"
                    type="solid"
                    buttonStyle={{borderRadius: 20, backgroundColor: '#E0558A'}}
                    style={styles.loginBtnStyle}
                    //onPress={() => this.props.navigation.navigate('TodoInput')}
                    onPress={this.handleSignUp}
                  ></Button>
                )}
              </View>

              <View style={[styles.otherwaysLogin, {flex: 1.2}]}>
                <Text style={styles.anotherLoginTxt}> Or login with</Text>
                <View style={[styles.anotherWaysLoginForm, {flex: 1.2}]}>
                  <Image
                    style={{width: 35, height: 35}}
                    source={require('../assets/facebook.png')}
                  ></Image>
                  <Image
                    style={{width: 40, height: 40}}
                    source={require('../assets/google.png')}
                  ></Image>
                  <Image
                    style={{width: 35, height: 35}}
                    source={require('../assets/twitter1.png')}
                  ></Image>
                </View>
              </View>
            </View>
          </View>
          <View style={{flex: 1.3}}></View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    backgroundColor: '#AAC0FA',
    opacity: 0.3,
  },
  imageLogoStyle: {
    alignSelf: 'center',
    justifyContent: 'flex-end',
    paddingTop: 80,
  },

  textStyle: {
    marginTop: 10,
    fontSize: 25,
    color: '#FFFFFF',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  importBoxStyle: {
    paddingTop: 20,
    alignItems: 'center',
  },
  backgroundFrameInput: {
    paddingTop: 22,
    paddingLeft: 22,
    paddingRight: 22,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(248, 238, 265 ,0.77)',
    borderRadius: 20,
  },
  btnLoginForm: {
    paddingTop: 10,
  },
  loginFormStyle: {
    justifyContent: 'space-around',
  },
  inputViewer: {
    height: 50,
    width: 300,
    borderWidth: 1,
    borderColor: '#5E6066',
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#ffffff',
    opacity: 0.7,
    marginVertical: 2,
  },
  bottomPart: {
    width: 300,
    backgroundColor: '#ffffff',
  },
  loginTextStyle: {
    fontSize: 25,
    color: '#000',
  },
  loginBtnStyle: {
    height: 50,
    width: 150,
  },
  integrateLoginForm: {
    width: 300,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  anotherWaysLoginForm: {
    width: 230,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
  },
  anotherLoginTxt: {
    justifyContent: 'center',
    color: '#566573',
    paddingTop: 10,
    textDecorationLine: 'underline',
  },
  otherwaysLogin: {
    alignItems: 'center',
  },
  titleTxtStyle: {
    fontSize: 35,
    color: 'red',
  },
});

export default connect(
  state => ({rWorks: state.works,}),
  dispatch =>
    bindActionCreators(
      {
        Register,
        Login,
      },
      dispatch
    )
)(Introduction);
