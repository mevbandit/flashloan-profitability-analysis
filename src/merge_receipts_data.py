import json

receipts = []
for i in range(24):
    with open(f'./data/FlashLoanReceipts/batch_{i}.json', 'r') as f:
        receipts += json.load(f)

with open(f'./data/FlashLoanReceipts/batch_24.json', 'r') as f:
        receipts += json.load(f)

with open('./data/AaveV2FlashLoanReceiptsMerged.json', 'w+') as f:
    json.dump(receipts, f, indent=4)
