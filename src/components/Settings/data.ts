export interface settingsDataItem {
  entity: string;
  elementValue: string;
  itemValue: string;
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
        entity: 'view',
        elementValue: 'all',
        itemValue: 'Show All',
      },
      {
        entity: 'view',
        elementValue: 'details',
        itemValue: 'Show details only',
      },
      {
        entity: 'view',
        elementValue: 'map',
        itemValue: 'Show map only',
      },
    ],
  },
  {
    title: 'Type',
    items: [
      {
        entity: 'type',
        elementValue: 'all',
        itemValue: 'Show All',
      },
      {
        entity: 'type',
        elementValue: 'volunteers',
        itemValue: 'Show volunteers only',
      },
      {
        entity: 'type',
        elementValue: 'requests',
        itemValue: 'Show requests only',
      },
    ],
  },
];
