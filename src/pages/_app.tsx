import { MapProvider, PlaceProvider } from '@/contexts';
import type { AppProps } from 'next/app';

import '@/styles/globals.css';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PlaceProvider>
      <MapProvider>
        <Component {...pageProps} />
      </MapProvider>
    </PlaceProvider>
  )
}
