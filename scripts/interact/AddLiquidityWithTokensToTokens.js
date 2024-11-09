require("dotenv").configDotenv();
const { ethers, artifacts } = require("hardhat");
const getWallet = require("../wallet");
const contractAddresses = require("../../ContractAddresses.json");

// fill this array with your desired Dex's Addresses from the ContractAddresses.json file
const dex = [contractAddresses.CONTRACT_OR_TOEKN_NAME];

// fetch artifacts from the artifact folder
// Note: adjsut the path according to your folder path
const dexArtifact = artifacts.readArtifactSync(
  "contracts/interfaces/Interface.sol:Interface"
);

// Assume that you want the same amount of token aganst another token create pool on the DEX
const amount = ethers.parseUnits("3000", "ether");

// Deadline For Within Which Time You Are Are You To Get The Pool Created
const deadLine = Math.floor(Date.now() / 1000 + 60 * 2);

/**
 * ApproveTokens()
 * Adds Liquidity in The dex And Also  Creates Pool
 * @param tokenA Address Of The Token0
 * @param tokenB Address Of The Token1
 * @param dexAddress Address of The Dex Where The Liquidity Pool Will Created For Trade
 * The pair will be vreated tokenA/tokenB in the Dex.
 * @returns true/kill the programe
 */
async function AddLiquidity(tokenA, tokenB, dexAddress) {
  // Create A Instance Of Teh DEX.
  const contract = await ethers.getContractAt(dexArtifact.abi, dexAddress);
  // Create Wallet Instance
  const { wallet } = await getWallet(process.env.PRIVATE_KEY);
  try {
    // Pool Creation And Liquidity Adding Starts From Here
    console.log("Adding Liquidity Started ");
    const trx = await contract
      .connect(wallet)
      .addLiquidity(
        tokenA,
        tokenB,
        amount,
        amount,
        0,
        0,
        wallet.address,
        deadLine
      );
    await trx.wait();
    console.log(
      `Liquidity Added With Token = ${tokenA} Against Token = ${tokenB}`
    );
    console.log(`At Dex = ${dexAddress}`);
    console.log("Adding Liquidity Completed");
    return true;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

/**
 * AutomateAddtoDex()
 * Actuallay Automate The Task By Running A Loop To The Dex
 */
async function AutomateAddtoDex() {
  for (let i = 0; i < dex.length; i++) {
    // Set The Token Address Here AddLiquidity() from contractAddresses
    await AddLiquidity(
      contractAddresses.CONTRACT_OR_TOEKN_NAME,
      contractAddresses.CONTRACT_OR_TOEKN_NAME,
      dex[i]
    );
  }
}
AutomateAddtoDex();
