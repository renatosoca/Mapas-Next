import { BtnMyLocation, MapsLayout, MapView, SearchBar } from '@/components';
import mapboxgl from 'mapbox-gl';
 
mapboxgl.accessToken = 'pk.eyJ1IjoicmVuYXRvLXNvY2EiLCJhIjoiY2xnb2k5aWk1MGNxODNmb2c1bDRtdzlhbSJ9.XuzwYsazUl2dYPRTH7Y6lw';

export default function HomePage() {
  return (
    <MapsLayout title="Home | Maps" pageDescription="Inicio de la pagina de maps">
      <MapView />
      <BtnMyLocation />
      <SearchBar />
    </MapsLayout>
  )
}
