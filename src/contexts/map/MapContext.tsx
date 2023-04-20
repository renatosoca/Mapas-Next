import { Map } from 'mapbox-gl';
import { createContext } from 'react';

export interface MapContextProps {
  isMapReady: boolean;
  map?: Map;
  handleSetMap: (map: Map) => void;
  getRoutesBetweenPoints: (start: [number, number], end: [number, number]) => Promise<void>;
}

export const MapContext = createContext( {} as MapContextProps );