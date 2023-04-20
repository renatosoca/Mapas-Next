import React, { FC, ReactNode } from 'react';
import Head from 'next/head';

interface Props {
  children: ReactNode;
  title: string;
  pageDescription: string;
}

export const MapsLayout: FC<Props> = ({ children, title, pageDescription }) => {
  return (
    <>
      <Head>
        <title>{ title }</title>
        <meta name="description" content={ pageDescription } />
      </Head>

      <main className='bg-gray-50'>
        { children }
      </main>
    </>
  )
}
