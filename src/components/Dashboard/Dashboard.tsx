import React, { useCallback, useState } from 'react';
import RequestSlider from '../RequestSlider/RequestSlider';
import MenuBar from '../MenuBar/MenuBar';
import CategoryList from '../CategoryList/CategoryList';
import UserLocation from '../UserLocation/UserLocation';
import LocationSlider from '../LocationSlider/LocationSlider';

const DashboardComponent = () => {
  const [showLocationSlider, setShowLocationSlider] = useState(false);

  const requestSliderBackdropComponent = useCallback(() => {
    return (
      <>
        <MenuBar />
        <UserLocation setShowLocationSlider={setShowLocationSlider} />
        <CategoryList />
      </>
    );
  }, []);

  return (
    <>
      {showLocationSlider ? (
        <LocationSlider
          backdropComponent={requestSliderBackdropComponent}
          setShowLocationSlider={setShowLocationSlider}
          showLocationSlider={showLocationSlider}
        />
      ) : (
        <RequestSlider backdropComponent={requestSliderBackdropComponent} />
      )}
    </>
  );
};

export default DashboardComponent;
