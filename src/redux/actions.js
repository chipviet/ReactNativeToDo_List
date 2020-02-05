import axios from 'axios';
import {createActions} from 'redux-actions';
import {connect} from 'mongoose';
import {Divider} from 'react-native-elements';

var user = 0;

const {
  registerUserRequest,
  registerUserSuccess,
  registerUserFail,
} = createActions({
  REGISTER_USER_REQUEST: () => {},
  REGISTER_USER_SUCCESS: data => ({data}),
  REGISTER_USER_FAIL: error => ({error}),
});

export const Register = (username, email, password) => async dispatch => {
  dispatch(registerUserRequest());
  try {
    const data = await axios.post(`http://10.11.1.8:3500/user/signup`, {
      username,
      email,
      password,
    });
    dispatch(registerUserSuccess(data));
    alert(data.data.message);
  } catch (error) {
    dispatch(registerUserFail(error));
  }
};

const {fetchUserRequest, fetchUserSuccess, fetchUserFail} = createActions({
  FETCH_USER_REQUEST: () => {},
  FETCH_USER_SUCCESS: data => data,
  FETCH_USER_FAIL: error => ({error}),
});

export const Login = (username, password) => async dispatch => {
  dispatch(fetchUserRequest());
  try {
    const data = await axios.post(`http://10.11.1.8:3500/user/login`, {
      username,
      password,
    });
    console.log('data received:',data);
    dispatch(fetchUserSuccess(data));
    alert(data.data.message);
  } catch (error) {
    console.log("toi day");
    dispatch(fetchUserFail(error));
  }

  // return dispatch => {

  //   axios
  //     .post(`http://10.11.1.8:3500/user/login`, {
  //       username,
  //       password,
  //     })
  //     .then(res => {
  //       alert(res.data.message);
  //       dispatch(fetchUserSuccess(res.data.payload.user))
  //     })
  //     .catch(err => {
  //       console.log(err.message);
  //       dispatch(fetchUserFail())
  //     });
  // };
};

const {getWorkRequest, getWorkSuccess, getWorkFail} = createActions({
  GET_WORK_REQUEST: () => {},
  GET_WORK_SUCCESS: data => ({data}),
  GET_WORK_FAIL: error => ({error}),
});

export const fetchDataWork =(page, userId) => async dispatch => {
  dispatch(getWorkRequest());
  try {
    axios
      .get(`http://10.11.1.8:3500/${userId}/${page}/null/null`)

  } catch (error) {
    
  }
  return dispatch => {
    axios
      .get(`http://10.11.1.8:3500/${userId}/${page}/null/null`)
      .then(res => {
        const data = {
          items: res.data.data,
          page,
          total_page: res.data.total_page,
        };
        console.log('data', data);
        dispatch(getWorks(data));
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function getWorks(data) {
  return {
    type: 'GET_WORKS',
    data,
  };
}

export function postDataWork(id, title, isCompleted) {
  console.log('User Id:', user.id);
  const userId = user.id;
  return dispatch => {
    axios
      .post(`http://10.11.1.8:3500/`, {
        userId,
        title,
        isCompleted,
      })
      .then(res => {
        dispatch(addWork(id, title, isCompleted));
      })
      .catch(err => {
        console.log('Can not post data to database');
      });
  };
}

export function addWork(id, title, isCompleted) {
  return {
    type: 'ADD_WORK',
    id,
    title,
    isCompleted,
  };
}

export function deleteDataWork(id) {
  return dispatch => {
    axios
      .delete('http://10.11.1.8:3500/', {
        params: {id},
      })
      .then(res => {
        dispatch(deleteWork(id));
      })
      .catch(err => {
        console.log('error:', err);
      });
  };
}

export function deleteWork(id) {
  return {
    type: 'DELETE_WORK',
    id,
  };
}

export function searchWork() {
  console.log('Searching Work');
  return {
    type: 'IS_SEARCHING',
  };
}

export function searchingWork(page, isSearching, dataSearching) {
  return dispatch => {
    axios
      .get(`http://10.11.1.8:3500/${page}/${isSearching}/${dataSearching}`)
      .then(res => {
        dispatch(getResultOfSearching(res.data.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function getResultOfSearching(data) {
  console.log('Present Data of Searching:', data);
  return {
    type: 'RESULT_OF_SEARCHING',
    data,
  };
}

export function completeDataWork(id, risCompleted) {
  return dispatch => {
    axios
      .put(`http://10.11.1.8:3500/${id}`, {
        params: {isCompleted: !risCompleted},
      })
      .then(res => {
        dispatch(completeWork(id));
      })
      .catch(err => {
        console.log('error:', err);
      });
  };
}

export function completeWork(id) {
  return {
    type: 'COMPLETE_WORK',
    id,
  };
}

export function searching() {
  return {
    type: 'IS_SEARCHING',
  };
}

export function showAll() {
  return {
    type: 'FILTER_SHOW_ALL',
  };
}

export function showCompleted() {
  return {
    type: 'FILTER_COMPLETED',
  };
}

export function showUncompleted() {
  return {
    type: 'FILTER_UNCOMPLETED',
  };
}

export function deletedAllWork() {
  return {
    type: 'DELETE_ALL_WORKS',
  };
}
// const {getWorkingRequest, getWorkingSuccess, getWorkingFail} = createActions({
//   GET_WORKING_REQUEST: () => {},
//   GET_WORKING_SUCCESS: data => data,
//   GET_WORKING_FAIL: error => ({error}),
// });

// export const fetchDataWork = (page)  => async(dispatch) =>{
//   console.log("page", page);
//     axios
//       .get(`http://10.11.1.39:3500/${page}`)
//       .then(res => {
//         console.log('res',res);
//         getWorkingRequest();
//         const data = {
//           items: res.data.data,
//           page,
//           total_page: res.data.total_page,
//         };
//         console.log('data',data);
//         dispatch(getWorkingSuccess(data));
//       })
//       .catch(getWorkingFail());
// }
