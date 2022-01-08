import json
from hexbytes import HexBytes
from web3 import Web3
from web3.datastructures import AttributeDict
from dotenv import load_dotenv, find_dotenv


load_dotenv(find_dotenv())
web3 = Web3(Web3.HTTPProvider(os.getenv('ALCHEMY_URL')))

with open('./data/AaveV2FlashLoanTxHashes.json', 'r') as f:
    transactionHashes = json.load(f)

# this is ridiculously inefficient and slow but it only needs to be run once
receipts = []
for i in range(int(transactionHashes['total'])):
    receipts.append(web3.eth.get_transaction_receipt(transactionHashes[str(i)]))

class HexJsonEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, AttributeDict):
            return dict(obj)
        if isinstance(obj, HexBytes):
            return obj.hex()
        return super().default(obj)

with open('./data/AaveV2FlashLoanReceipts.json', 'w+') as f:
    json.dump(receipts, f, indent=4, cls=HexJsonEncoder)