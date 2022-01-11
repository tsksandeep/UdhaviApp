import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { createSelector } from "reselect";
import { connect } from "react-redux";
import { AppInitialState } from "../../store/reducers/app";
import bindDispatch from "../../utils/actions";

const Home = ({ app, actions }: { app?: AppInitialState; actions?: any }) => {
  useEffect(() => {
    actions.changeAppLoading(false);
  }, []);

  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

const selector = createSelector(
  (state: any) => state.app,
  (app: AppInitialState) => ({ app })
);

export default connect(selector, bindDispatch)(Home);
