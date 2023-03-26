import React from 'react';
import Head from 'next/head';

import { BridgePass } from '@/components';

const Bridge = () => {
  return (
    <>
      <Head>
        <title>Bridge Pass Buy</title>
        <meta name="description" content="Buy your Bridge Pass" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <BridgePass />
      </main>
    </>
  );
};

export default Bridge;
