const { ethers } = require("hardhat");
async function getWallet(user_key) {
  const provider = new ethers.JsonRpcProvider(
    process.env.INFURA_SEPOLIA_URL,
    "sepolia"
  );
  const wallet = new ethers.Wallet(user_key, provider);
  return { wallet };
}

module.exports = getWallet;
