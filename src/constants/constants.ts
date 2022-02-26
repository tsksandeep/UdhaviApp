import Milk from '../assets/images/request_category/Milk.png';
import Medical from '../assets/images/request_category/Medical.png';
import Food from '../assets/images/request_category/Food.png';
import Transport from '../assets/images/request_category/Transport.png';
import Misc from '../assets/images/request_category/Misc.png';
import Accident from '../assets/images/request_category/Accident.png';

export const RequestStates = [
  'New',
  'Under Review',
  'Pending Assignment',
  'Processing',
  'Completed',
  'Cancelled',
];

export const RequestCategoryImageMap: any = {
  Milk: Milk,
  Medical: Medical,
  Food: Food,
  Transport: Transport,
  Misc: Misc,
  Accident: Accident,
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
