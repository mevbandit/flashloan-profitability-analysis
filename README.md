# Analyze Profitability of Flashloan Enabled Arbitrage and Liquidation
We explore on-chain data from Ethereum to construct a simple linear regression model to project profitability of flashloan enabled arbitrage and liquidation based upon several potential input parameters:
  1. DEX volume
  2. DEX liquidity
  3. Flashloan fee
  4. Gas costs

# Installation
Install the python dependencies using a virtual environment.
```sh
$ python3 -m venv venv
$ source ./venv/bin/activate
$ pip3 install -r requirements.txt
```

# Development Stage
This project is in the data processing stage.

## Status
We currently have all transaction receipts for transactions that emitted the `FlashLoan(...)` event defined in AaveV2 LendingPool. The logs themselves need to be analyzed for token transfers. 
A non exhaustive list of log analysis goals:
  1. Historic pricing data
    - aggregated/representative price is fine from eg coingecko/coinmarketcap
  2. Historic liquidity data
    - using `reserves` from blocks where flashloans occurred, also data from 1.
  3. Historic volume data
    - perhaps daily, then group all flashloan profits on a per day basis vs per block
  4. Identify all log events from other contracts eg sushiswap log events, curve log events...
    - identify functions called during flashloans, identify calldata