import { ethers } from 'hardhat';

async function main() {
  const BridgePass = await ethers.getContractFactory('BridgePass');
  const bridgePass = await BridgePass.deploy(
    // '0xFCa08024A6D4bCc87275b1E4A1E22B71fAD7f649' // Goerli Connext Address
    // '0x5Ea1bb242326044699C3d81341c5f535d5Af1504' // Optimism Goerli Connext address
    // '0x8f7492DE823025b4CfaAB1D34c58963F2af5DEDA' // Optimism Mainnet
    '0xEE9deC2712cCE65174B561151701Bf54b99C24C8' // Arbitrum Mainnet
  );

  await bridgePass.deployed();

  console.log(`Contract deployed to:", ${bridgePass.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
