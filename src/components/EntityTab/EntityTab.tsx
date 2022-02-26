import { css } from '@emotion/native';
import { Box, HStack, Text } from 'native-base';
import * as React from 'react';
import { Dimensions, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TabView } from 'react-native-tab-view';

const initialLayout = { width: Dimensions.get('window').width };

const EntityTab = (props: any) => {
  const [index, setIndex] = React.useState(props.selectedIndex);
  const [routes] = React.useState(props.tabHeaderMap);

  let onIndexChanged = (newIndex: any) => {
    setIndex(newIndex);
    if (props.onTabChange) {
      props.onTabChange(newIndex);
    }
  };

  const renderTabBar = (props: any) => {
    return (
      <Box flexDirection="row">
        {props.navigationState.routes.map((route: any, i: any) => {
          const borderColor = index === i ? '#F61023' : '#a1a1aa';

          return (
            <Box
              key={i}
              style={EntityTabStyle.box}
              borderBottomWidth="1"
              borderColor={borderColor}
              flex={1}
              alignItems="center"
            >
              <HStack justifyContent={'center'}>
                {route.filter ? route.filter : null}
                <TouchableOpacity onPress={() => onIndexChanged(i)}>
                  <Text bold style={EntityTabStyle.heading}>
                    {route.title}
                  </Text>
                </TouchableOpacity>
              </HStack>
              {route.tabElement}
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={props.sceneMap}
      renderTabBar={renderTabBar}
      onIndexChange={onIndexChanged}
      initialLayout={initialLayout}
      style={{ marginTop: StatusBar.currentHeight! + 100 }}
    />
  );
};

const EntityTabStyle = {
  box: css`
    padding-bottom: 10px;
    margin: 0 5px;
  `,
  heading: css`
    margin-left: 10px;
    font-size: 16px;
  `,
};

export default EntityTab;
