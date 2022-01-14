const fs = require('fs');

// txlist = JSON.parse(fs.readFileSync('../data/AaveV2FlashLoanReceiptsMerged.json'));
var gas = [];
const files = JSON.parse(fs.readdirSync(`../data/FlashLoanReceipts`));
//console.log(files);
for (const filename of files) {
    txlist = fs.readfileSync(JSON.parse(
            `../data/FlashLoanReceipts/${filename}`));
    for (const tx of txlist) {
      gas.append(tx['gasUsed']);
    }
  }
const sum = gas.reduce((a, b) => a + b, 0);
const avg = (sum / gas.length) || 0;
console.log(gas);


