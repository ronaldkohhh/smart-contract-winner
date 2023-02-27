const hre = require("hardhat");

async function main() {
  const Winner = await hre.ethers.getContractFactory('Winner');
  const winner = await Winner.deploy();

  const addressWinnerContract= '0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502cle';

  await winner.deployed();

  const result = await winner.sendAttempt(addressWinnerContract);
  console.log(result);

  console.log(`Contract deployed to ${winner.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
