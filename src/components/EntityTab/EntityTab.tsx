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

  if (props.store) {
    props.store.refreshMap['SwitchToTab'] = (newTabIndex: any) => {
      onIndexChanged(newTabIndex);
    };
  }

  const renderTabBar = (props: any) => {
    return (
      <Box flexDirection="row">
        {props.navigationState.routes.map((route: any, i: any) => {
          const color = index === i ? 'green' : 'gray';
          const borderColor = index === i ? '#F61023' : '#a1a1aa';

          return (
            <Box
              key={i}
              borderBottomWidth="4"
              borderColor={borderColor}
              flex={1}
              alignItems="center"
              p="2"
              rounded="xl"
            >
              <HStack justifyContent={'center'}>
                {route.filter ? route.filter : null}
                <TouchableOpacity onPress={() => onIndexChanged(i)}>
                  <Text bold style={{ color: color }}>
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

export default EntityTab;
