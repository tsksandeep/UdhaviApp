import React from "react";
import { Image, ImageStyle } from "react-native";
import { css } from "@emotion/native";

const Logo = () => {
  return (
    <Image
      style={
        css`
          width: 110px;
          height: 110px;
        ` as ImageStyle
      }
      source={require("../../assets/images/logo.png")}
    />
  );
};

export default Logo;
