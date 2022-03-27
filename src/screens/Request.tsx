import React, { useCallback } from 'react';
import { Text } from 'react-native';
import RequestFormSlider from '../components/RequestFormSlider/RequestFormSlider';
import MenuBar from '../components/MenuBar/MenuBar';
import { css } from '@emotion/native';

const Request = (props: any) => {
  const category = props.route.params.name;

  return (
    <RequestFormSlider
      backdropComponent={useCallback(() => {
        return (
          <>
            <MenuBar showBackButton={true} />
            <Text style={RequestStyle.heading}>{category}</Text>
            <Text style={RequestStyle.description}>
              Lorem ipsum dolor sit amet cotetuhfdr adipisicing elit. Iste odit
              consequatur quisquam consectetur qufyfos. Minus reprehenderit
              nobis, quos rerum, nulla facilis iusto maiores eveniet placeat
              harum officiis adipisci cupiditate quaerat
            </Text>
          </>
        );
      }, [])}
      snapPoints={['50%', '85%']}
      category={category}
    />
  );
};

const RequestStyle = {
  heading: css`
    font-family: 'Pacifico';
    font-size: 35px;
    color: #560cce;
    margin-bottom: 20px;
  `,
  description: css`
    font-size: 18px;
    line-height: 24px;
    text-align: justify;
    flex-shrink: 1;
  `,
};

export default Request;
