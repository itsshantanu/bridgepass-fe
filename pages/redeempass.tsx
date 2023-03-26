import React from 'react';
import Head from 'next/head';
import { PassRedeem } from '@/components';

const redeem = () => {
  return (
    <>
      <Head>
        <title>Redeem Bridge Pass</title>
        <meta name="description" content="Redeem your Bridge Pass" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <PassRedeem />
      </main>
    </>
  );
};

export default redeem;
