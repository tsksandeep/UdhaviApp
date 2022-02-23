import React, { useState } from 'react';
import { Image, Menu } from 'native-base';
import { Pressable } from 'react-native';

import filterImgDefault from '../../assets/images/filtersort.png';
import filterImgSelected from '../../assets/images/filtersort_selected.png';

interface ItemFilterProps {
  filter: string;
  setFilterCallback: Function;
  states: Array<string>;
  filterOption: string;
}

const ItemFilter = (props: ItemFilterProps) => {
  const { filter, setFilterCallback, states, filterOption } = props;

  const [currentFilter, setCurrentFilter] = useState(filter ? filter : 'all');

  const setFilterCallBack = (option: string) => {
    setCurrentFilter(option);
    setFilterCallback(option);
  };

  let isFilterInEffect = currentFilter && currentFilter != 'all';
  let filterImageKey = isFilterInEffect ? 'effective' : 'default';
  let filterImage = isFilterInEffect ? filterImgSelected : filterImgDefault;

  return (
    <Menu
      trigger={(triggerProps) => {
        return (
          <Pressable {...triggerProps}>
            <Image
              key={filterImageKey}
              alt={filterImageKey}
              source={filterImage}
              size="20px"
            />
          </Pressable>
        );
      }}
    >
      <Menu.OptionGroup
        defaultValue={currentFilter}
        title="Status Filter"
        type="radio"
      >
        <Menu.ItemOption
          key="all"
          value="all"
          onPress={() => setFilterCallBack('all')}
        >
          All
        </Menu.ItemOption>
        <>
          {states.map((item, index) => {
            return (
              <Menu.ItemOption
                key={index}
                value={item}
                onPress={() => setFilterCallBack(item)}
              >
                {item}
              </Menu.ItemOption>
            );
          })}
        </>
        <Menu.ItemOption
          key={filterOption}
          value={filterOption}
          onPress={() => setFilterCallBack(filterOption)}
        >
          {filterOption}
        </Menu.ItemOption>
      </Menu.OptionGroup>
    </Menu>
  );
};

export default ItemFilter;
