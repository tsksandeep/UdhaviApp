import React from 'react';
import { Button as PaperButton } from 'react-native-paper';

const Button = (props: any) => {
  return (
    <PaperButton
      style={props.style}
      mode={props.mode}
      {...props}
      color={'white'}
    />
  );
};

export default Button;
