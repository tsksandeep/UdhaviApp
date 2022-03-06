import React, { useCallback } from 'react';

import RequestSlider from '../RequestSlider/RequestSlider';
import MenuBar from '../MenuBar/MenuBar';
import CategoryList from '../CategoryList/CategoryList';

const DashboardComponent = () => {
  return (
    <RequestSlider
      backdropComponent={useCallback(() => {
        return (
          <>
            <MenuBar />
            <CategoryList />
          </>
        );
      }, [])}
    />
  );
};

export default DashboardComponent;
