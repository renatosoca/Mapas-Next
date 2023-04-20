import { Feature } from '@/interfaces';
import { createContext } from 'react';

export interface PlaceContextProps {
  isLoading: boolean;
  userLocation?: [ number, number ];
  isLoadingPlaces: boolean;
  places: Feature[];

  searchPlacesByTerm: (query: string) => Promise<Feature[]>;
}

export const PlaceContext = createContext( {} as PlaceContextProps );