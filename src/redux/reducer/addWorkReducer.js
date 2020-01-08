import {get} from 'lodash';
import { handleActions } from 'redux-actions';
import { combineActions } from 'redux-actions';
import {getWorkingFail,getWorkingRequest,getWorkingSuccess} from'../actions';
 
const defaultArrWorks = {
  works: {
    items: [],
    isCounter: 0,
    filterStatus: 'SHOW_ALL',
    isEditer: false,
    page: 1,
    totalPage: 1,
    requesting: false,
    status: '',
  },
};

const addWorkReducer = handleActions(
  combineActions(getWorkingRequest,getWorkingFail,getWorkingSuccess),
  {
    GET_WORKING_REQUEST: state => ({
      ...state,
      works: {
        ...state.works,
        requesting: true,
      },
    }),

    GET_WORKING_SUCCESS: (state, { payload }) =>( console.log("******",state),
      {
      ...state,
      works: {
        ...state.works,
        items:
          payload.page === 1
            ? get(payload, 'data.items', [])
            : [...state.works.items, ...payload.items],
        isCounter: payload.length,
        page: payload.page,
        totalPage: payload.total_page,
        requesting: false,
      },
    }),
    GET_WORKING_FAIL: (state, {payload}) => ({
      ...state,
      works: {
        ...state.works,
        requesting: false,
        status: 'error',
        error: payload.error,
      },
    }),
  },
  defaultArrWorks,
);
export default addWorkReducer;

// const addWorkReducer = (state = defaultArrWorks, action) => {
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

//   return state;
// };
// export default addWorkReducer;
