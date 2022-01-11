import React from "react";
import { View, Text } from "react-native";
import { TextInput as Input } from "react-native-paper";
import { theme } from "../../core/theme";

import TextInputStyleComponent from "./TextInput.style";

export default function TextInput(props: any) {
  var numberOfLines = 1;
  var isMultiline = false;
  if (props?.multiline && props?.numberOfLines) {
    isMultiline = true;
    numberOfLines = props?.numberOfLines;
  }

  return (
    <View style={TextInputStyleComponent.container}>
      <Input
        style={TextInputStyleComponent.input}
        selectionColor={theme.colors.primary}
        underlineColor="transparent"
        mode="outlined"
        multiline={isMultiline}
        numberOfLines={numberOfLines}
        {...props}
      />
      {props.description && !props.errorText ? (
        <Text style={TextInputStyleComponent.description}>
          {props.description}
        </Text>
      ) : null}
      {props.errorText ? (
        <Text style={TextInputStyleComponent.error}>{props.errorText}</Text>
      ) : null}
    </View>
  );
}
