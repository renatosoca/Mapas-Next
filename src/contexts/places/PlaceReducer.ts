import { Feature } from '@/interfaces';
import { PlaceState } from './';

type PlaceActionType = 
| { type: '[Place] - setUserLocation', payload: [ number, number ] }
| { type: '[Place] - setLoadingPlaces' }
| { type: '[Place] - setPlaces', payload: Feature[] }

export const PlaceReducer = ( state: PlaceState, action: PlaceActionType): PlaceState => {
  switch (action.type) {
    case '[Place] - setUserLocation':
      return {
        ...state,
        isLoading: false,
        userLocation: action.payload,
      }

    case '[Place] - setLoadingPlaces':
      return {
        ...state,
        isLoadingPlaces: true,
        places: [],
      }

    case '[Place] - setPlaces': 
      return {
        ...state,
        isLoadingPlaces: false,
        places: action.payload,
      }

    default:
      return state;
  }
}
