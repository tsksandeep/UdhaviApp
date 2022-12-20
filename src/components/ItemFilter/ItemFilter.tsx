import React, { useState } from 'react';
import { Text } from 'react-native';
import { css } from '@emotion/native';
import { Menu, MenuItem } from 'react-native-material-menu';

interface ItemFilterProps {
  name: string;
  filter: string;
  setFilterCallback: Function;
  states: Array<string>;
}

const ItemFilter = (props: ItemFilterProps) => {
  const { name, setFilterCallback, states } = props;
  const [visible, setVisible] = useState(false);

  const setFilterCallBack = (option: string) => {
    setFilterCallback(option);
  };

  return (
    <Menu
      visible={visible}
      anchor={
        <Text
          onPress={() => setVisible(true)}
          style={ItemFilterStyle.menuHeadingText}
        >
          {name}
        </Text>
      }
      onRequestClose={() => setVisible(false)}
    >
      <MenuItem key="all" onPress={() => setFilterCallBack('all')}>
        All
      </MenuItem>
      <>
        {states.map((item, index) => {
          return (
            <MenuItem key={index} onPress={() => setFilterCallBack(item)}>
              {item}
            </MenuItem>
          );
        })}
      </>
    </Menu>
  );
};

const ItemFilterStyle = {
  menuHeadingText: css`
    padding: 5px 10px;
    border-radius: 10px;
    background: #560cce;
    margin: 0 5px;
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
    color: #fff;
  `,
};

export default ItemFilter;
