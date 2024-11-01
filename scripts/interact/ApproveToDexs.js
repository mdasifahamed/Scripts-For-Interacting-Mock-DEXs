require("dotenv").configDotenv();
const { ethers, artifacts } = require("hardhat");
const getWallet = require("../wallet");
const contarctAddresses = require("../../ContractAddresses.json");

// fill this array with your desired Dex's Addresses from the ContractAddresses.json file
const dexs = [contarctAddresses.CONTRACT_OR_TOEKN_NAME];

// fill this array with your desired Token's Addresses from the ContractAddresses.json file
const tokens = [contarctAddresses.CONTRACT_OR_TOEKN_NAME];

// Assume that you want the same amount of token for each token to each dex
const amountToApprove = ethers.parseUnits("3000", "ether");

// fetch artifacts from the artifact folder
// Note: adjsut the path according to your folder path
const tokenArifact = artifacts.readArtifactSync(
  "contracts/interfaces/IERC20.sol:IERC20"
);

/**
 * ApproveTokens()
 * Approve the dex to sepnd the token from respective
 * token holder
 * @returns true/kill the programe
 */
async function ApproveTokens() {
  // Create the wallet instance to interactact with the contract
  // Pass the private of the account that holds the token to the getWallet()
  // getWallet() will return a instance of a wallet
  const { wallet } = await getWallet(process.env.PRIVATE_KEY);

  for (let i = 0; i < tokens.length; i++) {
    for (let j = 0; j < dexs.length; j++) {
      // creates the token/contract instacne
      const token = await ethers.getContractAt(tokenArifact.abi, tokens[i]);
      try {
        // actual transaction to approve the token to dex to use
        const trx = await token
          .connect(wallet)
          .approve(dexs[j], amountToApprove);
        await trx.wait();
        console.log(`Token = ${tokens[i]} Approved To ${dexs[j]} Dex`);
        return true;
      } catch (error) {
        console.log(error);
        process.exit(1);
      }
    }
  }
}
ApproveTokens();
