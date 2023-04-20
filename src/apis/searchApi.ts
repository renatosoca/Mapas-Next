import axios from 'axios';

const seacrhApi = axios.create({
  baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
  params: {
    limit: 5,
    lenguage: 'es',
    access_token: 'pk.eyJ1IjoicmVuYXRvLXNvY2EiLCJhIjoiY2xnb2k5aWk1MGNxODNmb2c1bDRtdzlhbSJ9.XuzwYsazUl2dYPRTH7Y6lw'
  }
})

export default seacrhApi;