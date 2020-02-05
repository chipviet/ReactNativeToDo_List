import {get} from 'lodash';
import {handleActions} from 'redux-actions';
import {combineActions} from 'redux-actions';
import {ActionSheetIOS} from 'react-native';
import { createKeyboardAwareNavigator } from 'react-navigation';

const defaultArrWorks = {
  works: {
    items: [],
    resultSearching: [],
    isCounter: 0,
    filterStatus: 'SHOW_ALL',
    isEditer: false,
    page: 1,
    totalPage: 1,
    requesting: false,
    status: null,
    error: null,
    result: null,
    isSearching: false,
  },
  user: {
    requesting: false,
    result: null,
    status: null,
    error: null,
  },
};

const addWorkReducer = handleActions(
  {
    REGISTER_USER_REQUEST: state =>
     ({
      ...state,
      user: {
        ...state.user,
        requesting: true,
      },
    }),

    REGISTER_USER_SUCCESS: (state, {payload}) =>
     ({
        ...state,
        user: {
          ...state.user,
          result: payload,
          requesting: false,
          status: 'success',
        },
      }),

    REGISTER_USER_FAIL: (state, {payload}) => ({
      ...state,
      user: {
        ...state.user,
        requesting: false,
        status: 'error',
        error: payload.error,
      },
    }),

    FETCH_USER_REQUEST: state => ({
      ...state,
      user: {
        ...state.user,
        requesting: true,
      },
    }),

    FETCH_USER_SUCCESS: (state, {payload}) => 
      ({
        ...state,
        user: {
          ...state.user,
          result: payload,
          requesting: false,
          status: payload.data.message ==='Successfully'? 'success':'error',
        },
      }),

    FETCH_USER_FAIL: (state, {payload}) => 
    ({
      ...state,
      user: {
        ...state.user,
        requesting: false,
        status: 'error',
        error: payload.error,
      },
    }),

    // GET_WORK_REQUEST: state => ({
    //   ...state,
    //   works: {
    //     ...state.works,
    //     requesting: true,
    //   },
    // }),

    // GET_WORK_SUCCESS: (state, {payload}) => ({
    //   ...state,
    //   works: {
    //     ...state.works,
    //     items:
    //       payload.data.page === 1
    //         ? get(payload, 'data.items', [])
    //         : [...state.works.items, ...payload.data.items],
    //     isCounter: payload.data.length,
    //     page: payload.data.page,
    //     totalPage: payload.data.total_page,
    //     status:'success',
    //     requesting:false,
    //   },
    // }),

    // GET_WORK_FAIL:(state,{payload}) => ({
    //   ...state,
    //   works:{
    //     ...state.works,
    //     requesting:false,
    //     status:'error',
    //     error: payload.error,
    //   }
    // }),

  
  },
  defaultArrWorks
);
export default addWorkReducer;

// const addWorkReducer = (state = defaultArrWorks, action) => {

// if( action.type === 'FETCH_USER_REQUEST'){
//   return {
//     ...state,
//     user:{
//       ...state.user,
//       requesting: true,
//     }
//   }
// }

// if( action.type === 'FETCH_USER_SUCCESS'){
//   return {
//     ...state,
//     user:{
//       ...state.user,
//       result: action.user,
//       requesting:false,
//       status:'success',
//     }
//   }
// }

// if( action.type === 'FETCH_USER_FAIL'){
//   return {
//     ...state,
//     user:{
//       ...state.user,
//       requesting:false,
//       status:'error',
//       error: action.error,
//     }
//   }
// }

// if (action.type === 'GET_WORKS') {
//   return {
//     ...state,
//     works: {
//       ...state.works,
//        items: action.data.page === 1 ? get(action, 'data.items', []) : [...state.works.items, ...action.data.items],
//       isCounter: action.data.length,
//       page: action.data.page,
//       totalPage:action.data.total_page
//     },
//   };
// }

//   if (action.type === 'ADD_WORK') {
//     return {
//       ...state,
//       works: {
//         ...state.works,
//         items: [
//           {
//             id: action.id,
//             title: action.title,
//             isCompleted: action.isCompleted,
//           },
//           ...state.works.items,
//         ],
//         isCounter: state.works.items.length + 1,
//       },
//     };
//   }

//   if (action.type === 'DELETE_WORK') {
//     return {
//       ...state,
//       works: {
//         ...state.works,
//         items: [...state.works.items.filter(item => item._id !== action.id)],
//       },
//     };
//   }

//   if (action.type === 'EDIT_WORK') {
//     return {
//       ...state,
//       works: {
//         ...state.works,
//         items: state.works.items.map(item => {
//           if (item.id !== action.id) return item;
//           return {...item, title: action.title, isCompleted: false};
//         }),
//         isEditer: true,
//       },
//     };
//   }

//   if (action.type === 'DELETE_ALL_WORKS') {
//     return {
//       ...state,
//       works: {
//         ...state.works,
//         items: [],
//         isCounter: -1,
//       },
//     };
//   }

//   if (action.type === 'COMPLETE_WORK') {
//     return {
//       ...state,
//       works: {
//         ...state.works,
//         items: state.works.items.map(item => {
//           if (item._id !== action.id) return item;
//           return {...item, isCompleted: !item.isCompleted};
//         }),
//       },
//     };
//   }

//   if (action.type === 'FILTER_SHOW_ALL') {
//     return {
//       ...state,
//       works: {
//         ...state.works,
//         filterStatus: 'SHOW_ALL',
//       },
//     };
//   }

//   if (action.type === 'FILTER_UNCOMPLETED') {
//     return {
//       ...state,
//       works: {
//         ...state.works,
//         filterStatus: 'SHOW_UNCOMPLETED',
//       },
//     };
//   }

//   if (action.type === 'FILTER_COMPLETED') {
//     return {
//       ...state,
//       works: {
//         ...state.works,
//         filterStatus: 'SHOW_COMPLETED',
//       },
//     };
//   }

//   if(action.type ==='IS_SEARCHING'){
//     return{
//       ...state,
//       works:{
//         ...state.works,
//         isSearching: !state.works.isSearching,
//       }
//     }
//   }

//   if(action.type ==='RESULT_OF_SEARCHING'){
//     console.log('action',action);
//     return{
//       ...state,
//       works:{
//         ...state.works,
//         resultSearching: [
//           ...action.data,
//         ]
//       }
//     }
//   }
//   return state;
// };
// export default addWorkReducer;

//************************************** */

// const addWorkReducer = handleActions(
//   combineActions(getWorkingRequest,getWorkingFail,getWorkingSuccess),
//   {
//     GET_WORKING_REQUEST: state => ({
//       ...state,
//       works: {
//         ...state.works,
//         requesting: true,
//       },
//     }),

//     GET_WORKING_SUCCESS: (state, { payload }) =>( console.log("******",state),
//       {
//       ...state,
//       works: {
//         ...state.works,
//         items:
//           payload.page === 1
//             ? get(payload, 'data.items', [])
//             : [...state.works.items, ...payload.items],
//         isCounter: payload.length,
//         page: payload.page,
//         totalPage: payload.total_page,
//         requesting: false,
//       },
//     }),
//     GET_WORKING_FAIL: (state, {payload}) => ({
//       ...state,
//       works: {
//         ...state.works,
//         requesting: false,
//         status: 'error',
//         error: payload.error,
//       },
//     }),
//   },
//   defaultArrWorks,
// );
// export default addWorkReducer;
