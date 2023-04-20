import { useContext, useState } from 'react'
import { MapContext, PlaceContext } from '@/contexts';
import { Feature } from '@/interfaces';

export const SearchResults = () => {

  const { places, isLoadingPlaces, userLocation } = useContext(PlaceContext);
  const { map, getRoutesBetweenPoints } = useContext(MapContext);

  const [activeId, setActiveId] = useState('');

  const handlePlaceClicked = (place: Feature) => {
    const [ lgt, ltd ] = place.center;

    setActiveId(place.id);

    map?.flyTo({
      zoom: 14,
      center: [ lgt, ltd ],
    })
  }

  const handleGetRoutes = (place: Feature) => {
    if (!userLocation) return;
    const [ lgt, ltd ] = place.center;

    getRoutesBetweenPoints(userLocation, [ lgt, ltd ] )
  }

  if (isLoadingPlaces) return <p>Cargando...</p>

  return (
    <ul className={`w-full bg-gray-400/70 ${places.length === 0 ? 'opacity-0 h-0' : 'opacity-100 h-full p-1'} transition-[opacity] rounded-md`} >
      {
        places.map( place => (
          <li 
            key={ place.id } 
            className={` p-2 rounded-md mb-1 ${activeId === place.id ? 'bg-neutral-400' : 'bg-slate-200'} cursor-pointer`} 
            onClick={ () => handlePlaceClicked(place) }
          >
            <h2 className='font-bold text-base' >{ place.text }</h2>
            <p className='font-normal text-sm text-slate-900' >{ place.place_name }</p>
            <button
              className={`w-full mt-2 bg-blue-500 text-white rounded-md py-1 px-4 hover:bg-blue-600 transition-colors`}
              onClick={ () => handleGetRoutes(place) }
            >
              Dirección
            </button>
          </li>
        ))
      }
    </ul>
  )
}
