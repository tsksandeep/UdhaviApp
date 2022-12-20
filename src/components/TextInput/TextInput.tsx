import React from 'react';
import { View, Text } from 'react-native';
import { TextInput as Input } from 'react-native-paper';
import { theme } from '../../core/theme';
import { css } from '@emotion/native';

export default function TextInput(props: any) {
  var numberOfLines = 1;
  var isMultiline = false;

  if (props?.numberOfLines) {
    isMultiline = true;
    numberOfLines = props?.numberOfLines;
  }

  const TextInputStyleComponent = {
    container: css`
      width: 100%;
      margin-vertical: 12px;
    `,
    input: css`
      border: 2px solid #560cce;
      background-color: #fff;
      border-radius: 10px;
      shadow-offset: 2px;
      shadow-color: #171717;
      shadow-opacity: 0.1;
      shadow-radius: 8px;
    `,
    description: css`
      font-size: 13px;
      color: ${theme.colors.secondary};
      padding-top: 8px;
    `,
    error: css`
      font-size: 13px;
      color: ${theme.colors.error};
      padding-top: 8px;
    `,
  };

  return (
    <View style={TextInputStyleComponent.container}>
      <Input
        style={TextInputStyleComponent.input}
        selectionColor="#560cce"
        activeUnderlineColor="transparent"
        underlineColor="transparent"
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
