import { Map, Marker } from 'mapbox-gl';
import { MapState } from './';

type MapActionType = 
| { type: '[Map] - setMap', payload: Map }
| { type: '[Map] - setMarkers', payload: Marker[] }


export const MapReducer = ( state: MapState, action: MapActionType): MapState => {
  switch (action.type) {
    case '[Map] - setMap':
      return {
        ...state,
        isMapReady: true,
        map: action.payload,
      }

    case '[Map] - setMarkers':
      return {
        ...state,
        markers: action.payload,
      }

    default:
      return state;
  }
}
