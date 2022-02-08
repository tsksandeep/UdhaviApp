export const RequestStates = [
  'New',
  'Under Review',
  'Pending Assignment',
  'Processing',
  'Completed',
  'Cancelled',
];

export const RequestCategoryImageMap: any = {
  Milk: require('../assets/request_category/Milk.png'),
  Medical: require('../assets/request_category/Medical.png'),
  Food: require('../assets/request_category/Food.png'),
  Transport: require('../assets/request_category/Transport.png'),
  Misc: require('../assets/request_category/Misc.png'),
  Accident: require('../assets/request_category/Accident.png'),
};

export const RequestStatesMap = {
  New: 'New',
  UnderReview: 'Under Review',
  PendingAssignment: 'Pending Assignment',
  Processing: 'Processing',
  Completed: 'Completed',
  Cancelled: 'Cancelled',
};

export const VolunteerStates = [
  'New',
  'Training',
  'Busy',
  'Available',
  'Unavailable',
];

export const VolunteerStatesMap = {
  New: 'New',
  Training: 'Training',
  Busy: 'Busy',
  Available: 'Available',
  Unavailable: 'Unavailable',
};

export const VolunteersAssignedFilterOption = 'Volunteer(s) Assigned';

export const RequestsAssignedFilterOption = 'Request(s) Assigned';
