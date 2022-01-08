import json

with open('./data/AaveV2FlashLoanReceipts.json', 'r') as f:
    receipts = json.load(f)

for i in range(24):
    with open(f'./data/FlashLoanReceipts/batch_{i}.json', 'w+') as f:
        json.dump(receipts[i * 1000: i * 1000 + 1000], f, indent=4)

with open(f'./data/FlashLoanReceipts/batch_24.json', 'w+') as f:
        json.dump(receipts[24000:], f, indent=4)