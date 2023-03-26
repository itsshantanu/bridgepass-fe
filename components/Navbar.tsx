import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';

const Navbar = () => {
  return (
    <>
      <nav className="sticky top-0 z-10 bg-black">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-2xl text-purple-300 font-semibold">
              Bridge Pass
            </Link>
            <div className="hidden md:flex space-x-4 text-purple-200">
              <Link href="/bridgepass" className="text-purple-300">
                BridgePass
              </Link>
              <Link href="/redeempass" className="text-purple-300">
                Redeem Pass
              </Link>
              <Link href="giftcard" className="text-purple-300">
                GiftCard
              </Link>
              <Link href="redeemgift" className="text-purple-300">
                Redeem Card
              </Link>
            </div>
            <div className="md:hidden flex items-center">
              <button className="text-purple-300 focus:outline-none">
                <i className="fas fa-bars"></i>
              </button>
            </div>
            <div>
              <ConnectButton />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
