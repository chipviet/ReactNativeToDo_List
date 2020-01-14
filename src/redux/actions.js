import axios from 'axios';
import {createActions} from 'redux-actions';

export function fetchDataWork(page){
  return dispatch => {
    axios
      .get(`http://10.11.1.33:3500/${page}/null/null`)
      .then(res => {
        const data = {
          items: res.data.data,
          page,
          total_page: res.data.total_page,
        };
        console.log('data',data);
        dispatch(getWorks(data));
      })
      .catch(err => {
        console.log(err)
      });
  }
}

export function getWorks(data) {
  return {
    type: 'GET_WORKS',
    data,
  };
}

export function postDataWork(id, title, isCompleted) {
  return dispatch => {
    axios
      .post(`http://10.11.1.33:3500/`, {
        title,
        isCompleted,
      })
      .then(res => {
        dispatch(addWork(id, title, isCompleted));
        console.log('Toi day');
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
      .delete('http://10.11.1.33:3500/', {
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

export function searchWork(){
  return {
    type:'IS_SEARCHING',
  }
}

export function searchingWork(page,isSearching,dataSearching){
  return dispatch => {
    axios
    .get(`http://10.11.1.33:3500/${page}/${isSearching}/${dataSearching}`)
    .then(res => {
      dispatch(getResultOfSearching(res.data.data));
    })
    .catch(error => {
      console.log(error);
    })
  }
} 

export function getResultOfSearching(data){
  console.log('Present Data of Searching:',data);
  return {
    type:'RESULT_OF_SEARCHING',
    data,
  }
}

export function completeDataWork(id, risCompleted) {
  return dispatch => {
    axios
      .put(`http://10.11.1.33:3500/${id}`, {
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

export function searching(){
  return{
    type: 'IS_SEARCHING',
  }
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