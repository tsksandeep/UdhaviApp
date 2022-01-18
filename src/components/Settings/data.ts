export interface settingsDataItem {
  elementValue: string;
  itemValue: string;
  callbackValues: {
    fieldName1: string;
    fieldValue1: boolean;
    fieldName2: string;
    fieldValue2: boolean;
  };
}

export interface settingsDataType {
  defaultValue?: string;
  title: string;
  items: Array<settingsDataItem>;
}

export const settingsData: Array<settingsDataType> = [
  {
    title: 'View',
    items: [
      {
        elementValue: 'showAll',
        itemValue: 'Show All',
        callbackValues: {
          fieldName1: 'hideMap',
          fieldValue1: false,
          fieldName2: 'hideDetails',
          fieldValue2: false,
        },
      },
      {
        elementValue: 'hideMap',
        itemValue: 'Show details only',
        callbackValues: {
          fieldName1: 'hideMap',
          fieldValue1: true,
          fieldName2: 'hideDetails',
          fieldValue2: false,
        },
      },
      {
        elementValue: 'hideDetails',
        itemValue: 'Show map only',
        callbackValues: {
          fieldName1: 'hideMap',
          fieldValue1: false,
          fieldName2: 'hideDetails',
          fieldValue2: true,
        },
      },
    ],
  },
  {
    title: 'Type',
    items: [
      {
        elementValue: 'showAll',
        itemValue: 'Show All',
        callbackValues: {
          fieldName1: 'hideRequests',
          fieldValue1: false,
          fieldName2: 'hideVolunteers',
          fieldValue2: false,
        },
      },
      {
        elementValue: 'hideRequests',
        itemValue: 'Show volunteers only',
        callbackValues: {
          fieldName1: 'hideRequests',
          fieldValue1: true,
          fieldName2: 'hideVolunteers',
          fieldValue2: false,
        },
      },
      {
        elementValue: 'hideVolunteers',
        itemValue: 'Show requests only',
        callbackValues: {
          fieldName1: 'hideRequests',
          fieldValue1: false,
          fieldName2: 'hideVolunteers',
          fieldValue2: true,
        },
      },
    ],
  },
];
