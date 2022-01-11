import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { TouchableOpacity, Image, View, ImageStyle } from "react-native";

import BackButtonStyleComponent from "./BackButton.style";

const BackButton = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      onPress={navigation.goBack}
      style={BackButtonStyleComponent.container}
    >
      <Image
        style={BackButtonStyleComponent.image as ImageStyle}
        source={require("../../assets/images/arrow_back.png")}
      />
    </TouchableOpacity>
  );
};

export default BackButton;
