import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { PlaceContext, PlaceReducer } from './';
import { getUserLocation } from '../../helpers';
import { searchApi } from '@/apis';
import { Feature, PlacesResponse } from '@/interfaces';

export interface PlaceState {
  isLoading: boolean;
  userLocation?: [ number, number ];
  isLoadingPlaces: boolean;
  places: Feature[];
}

const Place_INITIAL_STATE: PlaceState = {
  isLoading: true,
  userLocation: undefined,
  isLoadingPlaces: false,
  places: [],
}

export const PlaceProvider: FC<PropsWithChildren> = ({ children }) => {

  const [ state, dispatch ] = useReducer( PlaceReducer, Place_INITIAL_STATE);

  const handleSetUserLocation = async () => {
    const location = await getUserLocation()
    
    dispatch({ type: '[Place] - setUserLocation', payload: location });
  }

  const searchPlacesByTerm = async (query: string): Promise<Feature[]> => {
    if (query.length === 0) {
      dispatch({ type: '[Place] - setPlaces', payload: [] })
      return [];
    }

    dispatch({ type: '[Place] - setLoadingPlaces'});

    const { data } = await searchApi.get<PlacesResponse>(`/${ query }.json`, {
      params: {
        proximity: state.userLocation?.join(','),
      }
    })

    dispatch({ type: '[Place] - setPlaces', payload: data.features })

    return data.features;
  }

  useEffect(() => {
    handleSetUserLocation();
  }, [])

  return (
    <PlaceContext.Provider value={{
      ...state,

      searchPlacesByTerm,
    }}>
      { children }
    </PlaceContext.Provider>
  )
}
