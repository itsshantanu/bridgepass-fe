import React from 'react';
import Head from 'next/head';
import { BuyGift } from '@/components';

const GiftCard = () => {
  return (
    <>
      <Head>
        <title>Gift Card Buy</title>
        <meta name="description" content="Buy your Gift Card" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <BuyGift />
      </main>
    </>
  );
};

export default GiftCard;
