import axios from 'axios';

const directionApi = axios.create({
  baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
  params: {
    alternatives: false,
    geometries: 'geojson',
    overview: 'simplified',
    steps: false,
    access_token: 'pk.eyJ1IjoicmVuYXRvLXNvY2EiLCJhIjoiY2xnb2k5aWk1MGNxODNmb2c1bDRtdzlhbSJ9.XuzwYsazUl2dYPRTH7Y6lw'
  }
})

export default directionApi;