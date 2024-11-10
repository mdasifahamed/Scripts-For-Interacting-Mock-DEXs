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

- Contract method must set accoring to the dex's in the contract call like here is used `addLiquidityETH` and `addLiquidity`

```javascript
// In the AddLiquidityWithETH.js
// In AddLiquidityWithEth()
const trx = await dexContract
  .connect(wallet)
  .addLiquidityETH // like this `addLiquidityETH` method should be adjusted according to your dex contract .
  //rest of the parameter and code
  ();

// Also in AddLiquidityWithTokensToTokens.js
// In AddLiquidity()

const trx = await contract
  .connect(wallet)
  .addLiquidity // like this `addLiquidity` method should be adjusted according to your dex contract .
  //rest of the parameter and code
  ();
```

## ContractAddresses.json

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

## ApproveToDexs.js

This scrtips will automate your task for adding multiple token to multiple dexs at once.

### Must Be Consirered Scopes While Using This Scritp:

- `process.env.PRIVATE_KEY` the account that is used here must hold the desired amount of tokens that going to be approve the dex.

```javascript
const amountToApprove = ethers.parseUnits("3000", "ether");
```

- This `amountToApprove` which represent amount of token a user want to approve to a dexs/contract/account must be hold by this `process.env.PRIVATE_KEY` account. In the example `3000` is used.One must adjust this amount/number according to their holding and need of their approval.

## AddLiquidityWithTokensToTokens.js

This scrtips will automate your task for adding liqiuidity and creating pool for a token pair to the multiple DEX's.

### Must Be Consirered Scopes While Using This Scritp:

- `process.env.PRIVATE_KEY` the account that is used here must hold the desired amount of both tokens those are going to be used to create pool pair and going to liquid the DEX for trading.

This `amount` which represent amount of tokens a user want to created pool and add liquidity to a dexs the account that is going to create the liquidity pool must be hold by this `process.env.PRIVATE_KEY` account. In the example `3000` is used. One must adjust this amount/number according to their holding and need for creating liquidity pool.

```javascript
const amount = ethers.parseUnits("3000", "ether");
```

- Those `tokenA` And `tokenB` must be approved to all the DEX's with the same amount of `amount` this. **Hint:** Use `ApproveToDexs.js`

DEX's must have this amount of the tokens approval.

```javascript
const amount = ethers.parseUnits("3000", "ether");
```

For These tokens `tokenA` , `tokenB`

```javascript
async function AddLiquidity(tokenA, tokenB, dexAddress) {
  // rest of the code
}
```

- `deadLine` This must be greater than `block.timestamp` and must be in unix format.

```javascript
const deadLine = Math.floor(Date.now() / 1000 + 60 \* 2);
```

## AddLiquidityWithETH.js

This scrtips will automate your task for adding liqiuidity and creating pool for a token against eth to the multiple DEX's.

### Must Be Consirered Scopes While Using This Scritp:

- `process.env.PRIVATE_KEY` the account that is used here must hold the desired amount of both tokens those are going to be used to create pool pair and going to liquid the DEX for trading.

This `amount` which represent amount of tokens a user want to created pool and add liquidity to a dexs the account that is going to create the liquidity pool must be hold by this `process.env.PRIVATE_KEY` account. In the example `3000` is used. One must adjust this amount/number according to their holding and need for creating liquidity pool. And this Amount hold the amount of the eth that is quoted here `amountOfTheEtherToSend`.

```javascript
const amount = ethers.parseUnits("3000", "ether");
const amountOfTheEtherToSend = ethers.parseUnits("0.15", "ether");
```

- This `token_address` which represent the token must be approved to all the DEX's with the same amount of `amount` this. **Hint:** Use `ApproveToDexs.js`

DEX's must have this amount of the tokens approval.

```javascript
const amount = ethers.parseUnits("3000", "ether");
```

For This tokens `token`.

```javascript
async function AddLiquidityWithEth(token_address, dex_address) {
  // rest of the code
}
```

- `deadLine` This must be greater than `block.timestamp` and must be in unix format.

```javascript
const deadLine = Math.floor(Date.now() / 1000 + 60 \* 2);
```
