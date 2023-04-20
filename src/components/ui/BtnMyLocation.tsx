import { MapContext, PlaceContext } from '@/contexts';
import React from 'react'
import { useContext } from 'react';

export const BtnMyLocation = () => {
  const { userLocation } = useContext(PlaceContext);
  const { map, isMapReady } = useContext(MapContext);

  const handleClick = () => {
    if (isMapReady && map) {
      map.flyTo({
        center: userLocation,
        essential: true,
        zoom: 15,
      });
    }
  }

  return (
    <button 
      className='bg-blue-500 py-2 px-6 fixed top-5 right-5 z-50 rounded-md text-white font-semibold'
      onClick={ handleClick }
    >
      Mi ubicación
    </button>
  )
}
