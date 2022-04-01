import React, { useState } from 'react';
import { Menu } from 'native-base';
import { Pressable, Text, View } from 'react-native';
import { css } from '@emotion/native';

interface ItemFilterProps {
  name: string;
  filter: string;
  setFilterCallback: Function;
  states: Array<string>;
}

const ItemFilter = (props: ItemFilterProps) => {
  const { name, filter, setFilterCallback, states } = props;

  const [currentFilter, setCurrentFilter] = useState(filter ? filter : 'all');

  const setFilterCallBack = (option: string) => {
    setCurrentFilter(option);
    setFilterCallback(option);
  };

  return (
    <Menu
      trigger={(triggerProps) => {
        return (
          <Pressable {...triggerProps}>
            <View style={ItemFilterStyle.menuHeadingTextWrapper}>
              <Text style={ItemFilterStyle.menuHeadingText}>{name}</Text>
            </View>
          </Pressable>
        );
      }}
    >
      <Menu.OptionGroup
        defaultValue={currentFilter}
        title={`${name} Filter`}
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
      </Menu.OptionGroup>
    </Menu>
  );
};

const ItemFilterStyle = {
  menuHeadingTextWrapper: css`
    padding: 5px 10px;
    border-radius: 10px;
    background: #560cce;
    margin: 0 5px;
  `,
  menuHeadingText: css`
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
    color: #fff;
  `,
};

export default ItemFilter;
