require("dotenv").configDotenv();
const { ethers, artifacts } = require("hardhat");
const getWallet = require("../wallet");
const contractAddress = require("../../ContractAddresses.json");
const dexArtifact = artifacts.readArtifactSync(
  "contracts/interfaces/Interface.sol:Interface"
);

// fill this array with your desired Dex's Addresses from the ContractAddresses.json file
const dex = [contractAddress.CONTRACT_OR_TOEKN_NAME];

// fill this array with your desired Token Addresses from the ContractAddresses.json file
const tokens = [contractAddress.CONTRACT_OR_TOEKN_NAME];

// Assume that you want the same amount of token against another ETH create pool on the DEX
const amount = ethers.parseUnits("3000", "ether");
// Amoount the ETH To Used To Crete The Pool
const amountOfTheEtherToSend = ethers.parseUnits("0.15", "ether");
//minimum amount of the ETH to be used for pool creation
const minimumAmountOfTheEtherToSend = ethers.parseUnits("0.1", "ether");
//minimum amount of the token for pool creation
const minimuAmountOfToken = ethers.parseUnits("100", "ether");

// Deadline For Within Which Time You Are Are You To Get The Pool Created
const deadLine = Math.floor(Date.now() / 1000 + 60 * 2);

/**
 * AddLiquidityWithEth()
 * Adds Liquidity in The dex aganst ETH and also  creates roken/ETH pool
 * @param token_address Address Of The Token
 * @param dexAddress Address of The Dex Where The Liquidity Pool Will Created For Trade
 * The pair will be vreated TOKEN/ETH in the Dex.
 * @returns true/kill the programe
 */
async function AddLiquidityWithEth(token_address, dex_address) {
  // Create Wallet Instance

  const { wallet } = await getWallet(process.env.PRIVATE_KEY);

  // Create A Instance Of Teh DEX.
  const dexContract = await ethers.getContractAt(
    dexArtifact.abi,
    dex_address,
    wallet
  );
  try {
    // Pool Creation And Liquidity Adding Starts From Here
    console.log(`Liquidity Adding Started`);
    const trx = await dexContract.addLiquidityETH(
      token_address,
      amount,
      minimuAmountOfToken,
      minimumAmountOfTheEtherToSend,
      wallet.address, // Address Where to send Lliquidity Share Token
      deadLine,
      {
        value: amountOfTheEtherToSend,
      }
    );
    await trx.wait();
    console.log(
      `Liquidity Added Of Token = ${token_address} Against ETH at Dex ${dex_address}`
    );
    return true;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

/**
 * AddLiquidityToAll()
 * Actuallay Automate The Task By Running A Loop To The Dex's
 */
async function AddLiquidityToAll() {
  for (let i = 0; i < tokens.length; i++) {
    for (let j = 0; j < dex.length; j++) {
      await AddLiquidityWithEth(tokens[i], dex[j]);
    }
  }
  console.log("All Liquidity Adding Done");
}

AddLiquidityToAll();
