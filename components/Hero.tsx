import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '../assets';

const Hero = () => {
  return (
    <>
      <section className="bg-black text-white min-h-screen">
        <div className="container mx-auto px-4 py-8 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-300 via-pink-400 to-purple-600 bg-clip-text text-transparent">
                Introducing Gift Card and Bridge Pass
              </h1>
              {/* <p className="text-lg mb-4 bg-gradient-to-r from-purple-300 via-pink-400 to-purple-600 bg-clip-text text-transparent">
                Discover the easiest way to transfer ETH between accounts and
                different chains.
              </p> */}

              <p className="text-lg mb-4">
                Discover the easiest way to transfer ETH between accounts and
                different chains.
              </p>
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <Link
                  href="/bridgepass"
                  className="bg-purple-200 text-black py-2 px-4 rounded-lg text-center hover:bg-purple-300"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
