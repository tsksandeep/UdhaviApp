import React from "react";
import { Button as PaperButton } from "react-native-paper";
import { theme } from "../../core/theme";

import ButtonStyleComponent from "./Button.style";

const Button = (props: any) => {
  return (
    <PaperButton
      style={[
        ButtonStyleComponent.button,
        props.mode === "outlined" && { backgroundColor: theme.colors.surface },
        props.style,
      ]}
      labelStyle={ButtonStyleComponent.text}
      mode={props.mode}
      {...props}
    />
  );
};

export default Button;
