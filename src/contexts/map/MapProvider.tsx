import { directionApi } from '@/apis';
import { DirectionResponse } from '@/interfaces';
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from 'mapbox-gl';
import { FC, PropsWithChildren, useContext, useEffect, useReducer } from 'react';
import { PlaceContext } from '../places';
import { MapContext, MapReducer } from './';

export interface MapState {
  isMapReady: boolean;
  map?: Map;
  markers: Marker[];
}

const Map_INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
  markers: [],
}

export const MapProvider: FC<PropsWithChildren> = ({ children }) => {
  const [ state, dispatch ] = useReducer( MapReducer, Map_INITIAL_STATE);
  const { places } = useContext(PlaceContext);

  useEffect(() => {
    state.markers.forEach(marker => marker.remove());

    const newMarkets: Marker[] = [];

    for (const place of places) {
      const [ lng, ltd] = place.center;
      const popup = new Popup().setHTML(`
        <h4>${ place.text }</h4>
        <p>${ place.place_name }</p>
      `);
      const newMarker = new Marker().setPopup(popup).setLngLat([ lng, ltd ]).addTo(state.map!);

      newMarkets.push(newMarker);

      dispatch({ type: '[Map] - setMarkers', payload: newMarkets });
    }
  }, [places])

  const handleSetMap = (map: Map) => {
    const myLocationPopup = new Popup().setHTML(`
      <h4>Aquí estoy</h4>
      <p>Holaaa</p>
    `);

    new Marker({
      color: 'red',
    }).setLngLat(map.getCenter()).setPopup(myLocationPopup).addTo(map);

    dispatch({ type: '[Map] - setMap', payload: map });
  }

  const getRoutesBetweenPoints = async ( start: [ number, number], end: [ number, number ]) => {

    const { data } = await directionApi.get<DirectionResponse>(`/${ start.join(',') };${ end.join(',') }`)
    const { distance, duration, geometry } = data.routes[0];

    let kms = distance / 1000;
    kms = Math.round(kms * 100) / 100;

    const minutes = Math.floor( duration / 60 );
    
    const bounds = new LngLatBounds(
      start,
      start,
    );

    for (const coord of geometry.coordinates) {
      const newCoord: [ number, number ] = [ coord[0], coord[1] ];
      bounds.extend(newCoord);
    }

    state.map?.fitBounds(bounds, {
      padding: 200,
    });

    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: geometry.coordinates,
            }
          }
        ]
      }
    }

    if (state.map?.getLayer('RouteString')) {
      state.map.removeLayer('RouteString');
      state.map.removeSource('RouteString');
    }

    state.map?.addSource('RouteString', sourceData);

    state.map?.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': '#888',
        'line-width': 8,
      }
    });
  }

  return (
    <MapContext.Provider value={{
      ...state,

      handleSetMap,
      getRoutesBetweenPoints,
    }}>
      { children }
    </MapContext.Provider>
  )
}
