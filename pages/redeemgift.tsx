import React from 'react';
import Head from 'next/head';
import { GiftRedeem } from '@/components';

const redeem = () => {
  return (
    <>
      <Head>
        <title>Redeem Gift Card</title>
        <meta name="description" content="Redeem your Gift Card" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <GiftRedeem />
      </main>
    </>
  );
};

export default redeem;
