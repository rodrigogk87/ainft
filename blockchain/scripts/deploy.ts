import { ethers } from "hardhat";

async function main() {
  const AINFT = await ethers.getContractFactory("AINFT");
  const ainft = await AINFT.deploy();

  await ainft.deployed();

  console.log(`deployed to ${ainft.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
