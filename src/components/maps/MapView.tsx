import { useContext, useRef, useEffect } from 'react';
import { Map } from 'mapbox-gl';
import { MapContext, PlaceContext } from '@/contexts';
import { Loading } from '../ui';

export const MapView = () => {
  const { isLoading, userLocation } = useContext(PlaceContext);
  const { handleSetMap } = useContext(MapContext);

  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading) {
      const map = new Map({
        container: mapRef.current!,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: userLocation,
        zoom: 13,
      });
      handleSetMap(map);
    }
  }, [isLoading])
  

  if (isLoading) return <Loading />

  return (
    <div ref={ mapRef } style={{
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
    }}>
    </div>
  )
}
