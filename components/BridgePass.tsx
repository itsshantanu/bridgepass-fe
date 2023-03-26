import React, { useState, useEffect } from 'react';
import { BigNumber, utils } from 'ethers';
import { useAccount, useContract, useSigner } from 'wagmi';
import Image from 'next/image';
import { ETH } from '../assets';
import LoadModal from './LoadModal';

interface ChainConfig {
  contractAddress: string;
  price: BigNumber;
  explorer: string;
}

interface ChainConfigs {
  [key: string]: ChainConfig;
}

const chainConfig: ChainConfigs = {
  // for Goerli
  option1: {
    contractAddress: '0x71Ad2386c3C7c94B5D3967dCD4d9748a0AaFf9dB',
    price: utils.parseEther('0.0301'),
    explorer: 'https://goerli.etherscan.io/tx/',
  },

  // Optimism- Goerli
  option2: {
    contractAddress: '0x6C8AA605436c1846fCFEB0171f8e7274967E44e2',
    price: utils.parseEther('0.0301'),
    explorer: 'https://goerli-optimism.etherscan.io/tx/',
  },

  // Optimism Mainnet todo

  option3: {
    contractAddress: '0x7B4e13cDd520a3103423eC5F08D6B50c144fF0Fa',
    price: utils.parseEther('0.0301'),
    explorer: 'https://mumbai.polygonscan.com/tx/',
  },

  // Arbitrum Mainnet todo

  option4: {
    contractAddress: '0x7bFDe3c8a9444882FbEB20e7CB2c992925102792',
    price: utils.parseEther('0.001'),
    explorer: 'https://optimistic.etherscan.io/tx/',
  },
};

const BridgePass = () => {
  const { data: signer } = useSigner();

  const [address, setAddress] = useState('');
  const [selectedOption, setSelectedOption] = useState('option1');

  // Modal
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const [hash, setHash] = useState('');

  const [errMsg, setErrMsg] = useState('');
  const [isError, setIsError] = useState(false);

  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log('closed');
  };

  console.log('now', selectedOption);

  const contractAbi = [
    {
      inputs: [
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
      ],
      name: 'mintGiftCard',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
  ];

  const config = chainConfig[selectedOption];

  const mainContract: any = useContract({
    address: config.contractAddress,
    abi: contractAbi,
    signerOrProvider: signer,
  });

  const mintNow = async () => {
    setVisible(true);
    setLoading(true);

    try {
      const price = config.price;
      const options = { value: price };
      const pending = await mainContract.functions['mintGiftCard(address)'](
        address,
        options
      );
      const txResult = await pending.wait();
      setHash(txResult.transactionHash);
      setLoading(false);

      console.log(txResult);
    } catch (err: any) {
      console.log(err);
      setLoading(false);
      setIsError(true);
      const msg = err.message;
      const match = err.message.match();
      console.log('karm', err.message);

      if (err.message.includes('user rejected transaction')) {
        setErrMsg('You Reject the transaction ');
      } else if (err.message.includes('You have already redeemed this NFT')) {
        setErrMsg('already redeemed');
      } else if (
        err.message.includes(
          'insufficient funds for intrinsic transaction cost'
        )
      ) {
        setErrMsg(`Insufficient funds`);
      } else if (
        err.message.includes('resolver or addr is not configured for')
      ) {
        setErrMsg('Enter the address pls');
      } else {
        setErrMsg('Something went wrong');
      }
    }
  };

  return (
    <>
      {/* <div className="flex flex-col items-center justify-center bg-black p-8 rounded-lg h-screen">
        <div className="flex items-center justify-center">
          <Image
            src={ETH}
            alt="Image"
            height={512}
            width={512}
            className="object-cover rounded-lg mr-4"
          />
          <div className="p-8 rounded-lg bg-purple-200 text-center h-[392px] w-[352px]">
            <h2 className="text-lg font-medium mb-4 text-black">
              Buy Bridge Gift Card
            </h2>
            <h2 className="text-lg font-thin mb-4 text-black ">
              This Bridge Gift Card use transfer ETH from one chain to other
            </h2>
            <div className="mb-5">
              <p className="text-gray-600 mr-2 ">Price: 0.0031 ETH</p>
            </div>
            
            <div className="mb-4">
              <label className="mr-2 text-black" htmlFor="sourceChain">
                Source Chain:
              </label>
              <select
                className="input"
                id="sourceChain"
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                <option value="option1">Goerli</option>
                <option value="option2">Optimism-Goerli</option>
                <option value="option3">Optimism</option>
                <option value="option4">Arbitrum</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="mr-2 text-black" htmlFor="destinationChain">
                Destination Wallet:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                id="address"
                required={true}
                type="address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800"
                onClick={mintNow}
              >
                Mint Pass
              </button>
            </div>
            <LoadModal
              isLoading={loading}
              visible={visible}
              closeHandler={closeHandler}
              hash={hash}
              explorer={config.explorer}
              showSuccessText={false}
              errorMessage={errMsg}
            />
          </div>
        </div>
      </div> */}
      <div className="flex justify-center mt-[10%]">
        <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-300 via-purple-400 to-purple-600 bg-clip-text text-transparent">
          Buy your Bridge Pass
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center bg-black p-8 rounded-lg py-16">
        <div className="flex flex-col md:flex-row items-center justify-center">
          <Image
            src={ETH}
            alt="Image"
            height={392}
            width={392}
            className="object-cover rounded-lg mb-4 md:mb-0 md:mr-4"
          />
          <div className="p-8 rounded-lg bg-purple-400 text-center h-[392px] w-full md:w-[352px]">
            <h2 className="text-lg font-medium mb-4 text-black">
              Buy Bridge Gift Card
            </h2>
            <h2 className="text-lg font-thin mb-4 text-black ">
              This Bridge Gift Card use transfer ETH from one chain to other
            </h2>
            <div className="mb-5">
              <p className="text-black mr-2 ">Price: 0.03 ETH</p>
            </div>
            <div className="mb-4">
              <label className="mr-2 text-black" htmlFor="sourceChain">
                Source Chain:
              </label>
              <select
                className="input text-black bg-purple-200"
                id="sourceChain"
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                <option value="option1">Goerli</option>
                <option value="option2">Optimism-Goerli</option>
                <option value="option3">Optimism</option>
                <option value="option4">Arbitrum</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="mr-2 text-black" htmlFor="destinationChain">
                Destination Wallet:
              </label>
              <input
                className="shadow appearance-none bg-purple-200 border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                id="address"
                required={true}
                type="address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800"
                onClick={mintNow}
              >
                Mint Pass
              </button>
            </div>
            <LoadModal
              isLoading={loading}
              visible={visible}
              closeHandler={closeHandler}
              hash={hash}
              explorer={config.explorer}
              showSuccessText={false}
              errorMessage={errMsg}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BridgePass;
