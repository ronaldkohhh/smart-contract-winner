# Alchemy University - Week 4 Task
Your goal is simple! Emit the winner event on this smart contract on the Goerli testnet: https://goerli.etherscan.io/address/0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502#code

If you take a look at the Code tab in Etherscan, you'll see that the source code for this contract looks like this:

```
// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Contract {
    event Winner(address);

    function attempt() external {
        require(msg.sender != tx.origin, "msg.sender is equal to tx.origin");
        emit Winner(msg.sender);
    }
}
```

How do we possibly make it so the tx.origin (the EOA who originated the transaction) is not equal to the msg.sender? 🤔

We'll leave that challenge up to you!

# Solution
Create a simple contract and use it to make the attempt call to the Winner Contract through the interface.

```
interface WinnerContract {
    function attempt() external;
}

contract EmitEvent {
    function sendAttempt(address _contract) public {
        return WinnerContract(_contract).attempt();
    }
}
```

Update deploy.js script to send a transaction to invoke the attempt method on the deployed contract.

```
const hre = require("hardhat");

async function main() {
  const EmitEvent = await hre.ethers.getContractFactory("EmitEvent");
  const emitEvent = await EmitEvent.deploy();
  const addressWinnerContract = "0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502";

  await emitEvent.deployed();

  // Call the "attempt" method of Winner Contract through the interface inside our Contract
  const result = await emitEvent.sendAttempt(addressWinnerContract);

  console.log(`Contract deployed to ${emitEvent.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```
