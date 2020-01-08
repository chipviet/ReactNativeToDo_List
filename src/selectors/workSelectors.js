import {createSelector} from 'reselect';

const getWorks = (state) => state.works.works.items;
const getVisibilityWorks = (state) => state.works.works.filterStatus;

export const getVisibleWorks = createSelector(
  [getVisibilityWorks, getWorks],
  (filterStatus, items) => {
    switch (filterStatus) {
      case 'SHOW_COMPLETED':
        return items.filter((item) => item.isCompleted);
      case 'SHOW_UNCOMPLETED':
        return items.filter((item) => !item.isCompleted);
      default:
        return items;
    }
  },
);
