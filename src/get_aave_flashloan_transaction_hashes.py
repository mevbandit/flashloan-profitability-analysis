import json
from web3 import Web3
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())
web3 = Web3(Web3.HTTPProvider(os.getenv('ALCHEMY_URL')))

v1FlashLoanTopic = Web3.keccak(
    text='FlashLoan(address,address,uint256,uint256,uint256,uint256)'
).hex()

v2FlashLoanTopic = Web3.keccak(
    text='FlashLoan(address,address,address,uint256,uint256,uint16)'
).hex()

transactionHashes = {}
count = 0

# not the best or fastest way :^) but addresses 10k logs limit
# i got the first block number from the AaveV2LendingPool deploy transaction
for i in range(11362579, 13961607, 10000):
    filter = web3.eth.filter({
        'fromBlock': i,
        'toBlock': i + 10000,
        'topics': [v2FlashLoanTopic]
    })
    logs = web3.eth.get_filter_logs(filter.filter_id)
    for j in range(len(logs)):
        transactionHashes[count] = logs[j].transactionHash.hex()
        count += 1

transactionHashes['total'] = count

with open('./data/AaveV2FlashLoanTxHashes.json', 'w+') as f:
    json.dump(transactionHashes, f, indent=4)