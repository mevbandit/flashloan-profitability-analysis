const fs = require('fs');

const SWAPADDR = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";
const DATADIR = "../data/FlashLoanReceipts/";

// ** for arb calculations **
// function hexToInt(hex) {
//   if (hex.length % 2 != 0) {
//     hex = "0" + hex;
//   }
//   var num = parseInt(hex, 16);
//   var maxVal = Math.pow(2, hex.length / 2 * 8);
//   if (num > maxVal / 2 - 1) {
//     num = num - maxVal
//   }
//   return num;
// }

// parsing loops
function getstats() {
  var gas = [];
  var gasperswap = [];
  var numswaps = [];
  const files = fs.readdirSync(DATADIR);
  for (const filename of files) {
    txlist = JSON.parse(fs.readFileSync(DATADIR + filename));
  
    for (const tx of txlist) {
      gas.push(tx['gasUsed']);
      let swapcount = 0;
  
      for (const log of tx['logs']) {
        if (log['topics'][0] === SWAPADDR) { swapcount ++; }
      }
  
      if (swapcount) {
          gasperswap.push((parseInt(tx['gasUsed']))/(swapcount));
          numswaps.push(swapcount);
      }
    }
  }
  // calculations from the resulting arrays after parsing
    const sumgas = gas.reduce((a, b) => a + b, 0);
    const avggas = (sumgas / gas.length) || 0;
    const avggasperswap = (gasperswap.reduce((a, b) => a + b, 0) / gas.length);
    const avgnumswaps =  (numswaps.reduce((a, b) => a + b, 0) / numswaps.length);
  // ** for arb calculations **
  // const sumarbs = arbs.reduce((a, b) => a + b, 0);
  // const avgarb = (sumarbs / (arbs.length * (Math.pow(10,6)))) || 0;
    console.log("avg gas used per tx =", avggas,"avg gas used per swap =", avggasperswap, "avg number of swaps per tx =", avgnumswaps);
}

getstats();