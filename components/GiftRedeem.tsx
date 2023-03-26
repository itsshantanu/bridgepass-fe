import React, { useState, useEffect } from 'react';
import { useAccount, useContract, useSigner } from 'wagmi';
import LoadModal from './LoadModal';

interface ChainConfig {
  contractAddress: string;
  explorer: string;
}

interface ChainConfigs {
  [key: string]: ChainConfig;
}

const chainConfig: ChainConfigs = {
  // for Scroll
  option1: {
    contractAddress: '0x7bFDe3c8a9444882FbEB20e7CB2c992925102792', // Done
    explorer: 'https://blockscout.scroll.io/tx/',
  },

  // for Goerli
  option2: {
    contractAddress: '0x7bFDe3c8a9444882FbEB20e7CB2c992925102792',
    explorer: 'https://goerli.etherscan.io/tx/',
  },

  // For Mumbai
  option3: {
    contractAddress: '0x7bFDe3c8a9444882FbEB20e7CB2c992925102792', // todo
    explorer: 'https://mumbai.polygonscan.com/tx/',
  },

  // For ZKEVM
  option4: {
    contractAddress: '0x7bFDe3c8a9444882FbEB20e7CB2c992925102792', // todo
    explorer: 'https://testnet-zkevm.polygonscan.com/tx/',
  },

  // Optimism-Goerli
  option5: {
    contractAddress: '0x7bFDe3c8a9444882FbEB20e7CB2c992925102792', // todo
    explorer: 'https://goerli-optimism.etherscan.io/tx/',
  },

  // Optimism
  option6: {
    contractAddress: '0x7bFDe3c8a9444882FbEB20e7CB2c992925102792', // todo
    explorer: 'https://optimistic.etherscan.io/tx/',
  },

  // Sepolia
  option7: {
    contractAddress: '0x7bFDe3c8a9444882FbEB20e7CB2c992925102792', // todo
    explorer: 'https://sepolia.etherscan.io/tx/',
  },
};

const GiftRedeem = () => {
  const { data: signer } = useSigner();

  const [address, setAddress] = useState('');
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
          internalType: 'uint256',
          name: '_tokenId',
          type: 'uint256',
        },
      ],
      name: 'redeemGift',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ];

  const config = chainConfig[selectedOption];
  const mainContract: any = useContract({
    address: config.contractAddress,
    abi: contractAbi,
    signerOrProvider: signer,
  });

  console.log(selectedOption);

  const claimGift = async () => {
    setVisible(true);
    setLoading(true);
    try {
      const pending = await mainContract.functions['redeemGift(uint256)'](
        tokenId
      );
      const txResult = await pending.wait();
      setHash(txResult.transactionHash);
      setLoading(false);
      console.log(txResult.transactionHash);
    } catch (err: any) {
      setLoading(false);
      setIsError(true);
      console.log(errMsg);
      //   const msg = err.message;
      //   const match = err.message.match();
      console.log(err.message);

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
      } else if (
        err.message.includes('sending a transaction requires a signer ')
      ) {
        setErrMsg('Please connect your wallet');
      } else {
        setErrMsg('Something went wrong');
      }
    }
  };

  return (
    <>
      <main className="flex flex-col min-h-screen">
        <div className="flex justify-center mt-[10%]">
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-300 via-purple-400 to-purple-600 bg-clip-text text-transparent">
            Redeem your Gift Card
          </h1>
        </div>

        <div className="bg-purple-400 p-6 rounded-md shadow-md w-full max-w-md mx-auto mt-[5%]">
          <h1 className="text-xl text-black text-center font-semibold mb-4">
            Redeem Gift Card
          </h1>
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
              <option value="option1">Scroll</option>
              <option value="option2">Goerli</option>
              <option value="option3">Mumbai</option>
              <option value="option4">ZKEVM</option>
              <option value="option5">Optimism Goerli</option>
              <option value="option6">Optimism</option>
              <option value="option7">Sepolia</option>
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
              errorMessage={isError ? errMsg : ''}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default GiftRedeem;
