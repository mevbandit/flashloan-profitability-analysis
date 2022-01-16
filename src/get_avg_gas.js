const fs = require('fs');

// parsing loops. 
var gas = [];
var swaps = [];
var gasperswap = [];
var numswaps = [];
const files = (fs.readdirSync(`../data/FlashLoanReceipts`));
for (const filename of files) {
  txlist = JSON.parse(fs.readFileSync(`../data/FlashLoanReceipts/${filename}`));
  for (const tx of txlist) {
    gas.push(tx['gasUsed']);
    let swapcount = 0;
    for (const log of tx['logs']) {
      let topic1 = log['topics'][0];
      if (topic1 == "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef") {
        swaps.push(topic1);
        swapcount ++;
      }
      if (swapcount != 0) {
      gasperswap.push((parseInt(tx['gasUsed']))/(swapcount));
      numswaps.push(swapcount);
      }
    }
  }
}
 //calculations from the resulting arrays after parsing.
  const sumgas = gas.reduce((a, b) => a + b, 0);
  const avggas = (sumgas / gas.length) || 0;
  const avggasperswap = (gasperswap.reduce((a, b) => a + b, 0) / gasperswap.length);
  const avgnumswaps =  (numswaps.reduce((a, b) => a + b, 0) / numswaps.length);
  console.log("avg gas used per tx =", avggas,"avg gas used per swap =",avggasperswap, "avg number of swaps per tx =", avgnumswaps);




