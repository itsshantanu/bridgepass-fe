import { ethers } from 'hardhat';

async function main() {
  const GiftCard = await ethers.getContractFactory('GiftCard');
  const giftCard = await GiftCard.deploy();

  await giftCard.deployed();

  console.log(`Contract deployed to:", ${giftCard.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
