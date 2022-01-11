import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { View } from "react-native";

import AuthStyleComponent from "./Auth.style";
import Logo from "../Logo/Logo";
import GradientText from "../GradientText/GradientText";
import Button from "../Button/Button";

const AuthComponent = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={AuthStyleComponent.container}>
      <Logo />
      <GradientText style={AuthStyleComponent.header}>Thagaval</GradientText>
      <Button mode="contained" onPress={() => navigation.navigate("Login", {})}>
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate("Register", {})}
      >
        Sign Up
      </Button>
    </View>
  );
};

export default AuthComponent;
