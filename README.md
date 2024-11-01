# How to use the scripts:

Anyone can follow the below process/methods to use the scripts or customize as their need.

## Important Note:

Must create a `.env` file on the root of the project and fill it with `INFURA_SEPOLIA_URL` and `PRIVATE_KEY` otherwise `hardhat config error will thrown`. Anyone skip this by changing the configuration of the `hardhat.config.js` file or modified it as your need.

- In the `.env` file

```javascript
INFURA_SEPOLIA_URL = "your infura api key";
PRIVATE_KEY = "your account private key";
ETHERSCAN_API_KEY = "your etherscan api key";
```

### ContractAddresses.json

This is json file which contains the addresses of the token and dex.From where you can access the addresses in your any scripts rather than hardcoding them repeatedly.

- Anyone can use `ContractAddresses.json` as follow:

```javascript
{
  "UNISWAP": "Ox000000000000000000000000000000000000000000000",
  "PANCAKESWAP":"Ox000000000000000000000000000000000000000000000",
  "WETH":"Ox000000000000000000000000000000000000000000000",
  "SHIB":"Ox000000000000000000000000000000000000000000000",
}
```

### ApproveToDexs.js

This is scrtips automate your task for adding multiple token to multiple dexs at once.

**Must Be Consirered Scopes While Using This Scritp**

- `process.env.PRIVATE_KEY` account that is used here must have the desired amount of tokens that going to be approve the dex.

```javascript
const amountToApprove = ethers.parseUnits("3000", "ether");
```

- This `amountToApprove` which represent amount of token a user want to approve to a dexs/contract/account must be hold by this `process.env.PRIVATE_KEY` account. In the example `3000` is used.One must adjust this amount/number according to their holding and need of their approval.
