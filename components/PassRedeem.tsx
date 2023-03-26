import React, { useState, useEffect } from 'react';
import { useAccount, useContract, useSigner } from 'wagmi';
import LoadModal from './LoadModal';

interface ChainConfig {
  contractAddress: string;
  destinationWrapper: string;
  wethAddress: string;
  relayerFee: number;
  destinationDomain: number;
  explorer: string;
  slippage: number;
}

interface ChainConfigs {
  [key: string]: ChainConfig;
}

const chainConfig: ChainConfigs = {
  // for Goerli to Optimism Goerli
  option1: {
    contractAddress: '0x71Ad2386c3C7c94B5D3967dCD4d9748a0AaFf9dB', // Done
    destinationWrapper: '0x08bDeFD0e4878A814Cb2fd11C033F3947251689f',
    wethAddress: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
    relayerFee: Number(BigInt('20000000000000000')),
    destinationDomain: 1735356532,
    slippage: 10000,
    explorer: 'https://goerli.etherscan.io/tx/',
  },

  // for Optimism Goerli to Goerli

  option2: {
    contractAddress: '0x6C8AA605436c1846fCFEB0171f8e7274967E44e2',
    destinationWrapper: '0xa6633d369A9C4C8A442ef104E8e293DA7b352Acd', // Replace with Mainnet values
    wethAddress: '0x74c6FD7D2Bc6a8F0Ebd7D78321A95471b8C2B806', // Replace with Mainnet values
    relayerFee: Number(BigInt('20000000000000000')), // Replace with Mainnet values
    destinationDomain: 1735353714,
    slippage: 10000,
    explorer: 'https://goerli-optimism.etherscan.io/tx/',
  },

  // For Optimism Mainnet to Arbitrum Mainnet
  option3: {
    contractAddress: '0x463e6d4993d30D9f2987a4C53d4E4a18DE195586', // Op Mainnet address
    destinationWrapper: '0x429b9eb01362b2799131EfCC44319689b662999D', // Replace with Polygon values
    wethAddress: '0x4200000000000000000000000000000000000006', // Replace with Polygon values
    relayerFee: Number(BigInt('3000000000000000')),
    destinationDomain: 1634886255,
    slippage: 300,
    explorer: 'https://optimistic.etherscan.io/tx/',
  },

  // For Arbitrum Mainnet to Optimism Mainnet

  option4: {
    contractAddress: '0xB5a6Ba7c9B16D358f06909C753Bb150ceb9ef70b', // todo
    destinationWrapper: '0x7Fe09d217d646a6213e51b237670Bc326188cB93', // Replace with Polygon values
    wethAddress: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1', // Replace with Polygon values
    relayerFee: Number(BigInt('3000000000000000')),
    destinationDomain: 1869640809,
    slippage: 300,
    explorer: 'https://polygonscan.com/tx/',
  },
};

const PassRedeem = () => {
  const { data: signer } = useSigner();
  const { address } = useAccount();

  const [addr, setAddr] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [selectedOption, setSelectedOption] = useState('option1');

  // Modal
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const [hash, setHash] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [isError, setIsError] = useState(false);

  const closeHandler = () => {
    setVisible(false);
    console.log('closed');
  };

  const contractAbi = [
    {
      inputs: [
        {
          internalType: 'address',
          name: 'destinationUnwrapper',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'weth',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
        {
          internalType: 'address',
          name: 'recipient',
          type: 'address',
        },
        {
          internalType: 'uint32',
          name: 'destinationDomain',
          type: 'uint32',
        },
        {
          internalType: 'uint256',
          name: 'slippage',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'relayerFee',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_tokenId',
          type: 'uint256',
        },
      ],
      name: 'redeemGiftCard',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      stateMutability: 'payable',
      type: 'receive',
    },
  ];

  const config = chainConfig[selectedOption];
  const mainContract: any = useContract({
    address: config.contractAddress,
    abi: contractAbi,
    signerOrProvider: signer,
  });

  console.log(selectedOption);

  //   relayer fee

  const claimGift = async () => {
    setVisible(true);
    setLoading(true);
    try {
      const pending = await mainContract.functions[
        'redeemGiftCard(address,address,uint256,address,uint32,uint256,uint256,uint256)'
      ](
        config.destinationWrapper, // destination wrapper
        config.wethAddress, // weth address
        100000000000000, // amount to receive
        addr, // receiver address
        config.destinationDomain, // destination domain
        config.slippage, //slippage
        config.relayerFee.toString(), // relayer fee
        tokenId // Gift Card NFT token Id
      );
      const txResult = await pending.wait();
      setHash(txResult.transactionHash);
      setLoading(false);
      console.log(txResult.transactionHash);
    } catch (err: any) {
      setLoading(false);
      setIsError(true);
      console.log('karm', err);
      const msg = err.message;
      const match = err.message.match();
      console.log('karm', err.message);

      if (err.message.includes('user rejected transaction')) {
        setErrMsg('You Reject the transaction ');
      } else if (err.message.includes('You have already redeemed this NFT')) {
        setErrMsg('This Gift Card is already redeemed');
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
      } else if (err.message.includes('invalid BigNumber string ')) {
        setErrMsg('Please Enter the Gift Id');
      } else if (err.message.includes('invalid token ID')) {
        setErrMsg('Invalid Gift Id');
      } else {
        setErrMsg('Something went wrong');
      }
    }
  };

  return (
    <>
      <div className="flex justify-center mt-[10%]">
        <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-300 via-purple-400 to-purple-600 bg-clip-text text-transparent">
          Redeem your Bridge Pass
        </h1>
      </div>

      <div className="bg-purple-400 p-6 rounded-md shadow-md w-full max-w-md mx-auto mt-[5%]">
        <h1 className="text-xl text-black text-center font-semibold mb-4">
          Redeem Pass
        </h1>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="address"
          >
            Address
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 bg-purple-200 text-black leading-tight focus:outline-none focus:shadow-outline"
            id="address"
            type="text"
            value={addr}
            onChange={(e) => setAddr(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="tokenId"
          >
            Token ID
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black bg-purple-200 leading-tight focus:outline-none focus:shadow-outline"
            id="tokenId"
            type="text"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Select Chain
          </label>
          <select
            className="shadow appearance-none border rounded w-[66%] py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-purple-200"
            id="option"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="option1">Goerli to Optimism Goerli</option>
            <option value="option2">Optimism Goerli to Goerli</option>
            <option value="option3">Optimism to Arbitrum</option>
            <option value="option4">Arbitrum to Optimism</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-black hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={claimGift}
          >
            Redeem Gift
          </button>
          <LoadModal
            isLoading={loading}
            visible={visible}
            closeHandler={closeHandler}
            hash={hash}
            explorer={config.explorer}
            showSuccessText={true}
            // errorMessage={errMsg}
            errorMessage={isError ? errMsg : ''}
          />
        </div>
      </div>
    </>
  );
};

export default PassRedeem;
